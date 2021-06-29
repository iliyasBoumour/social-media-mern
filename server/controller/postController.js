const asyncHandler = require('express-async-handler');
const Post = require('../models/Posts');
const User = require('../models/User');
const Notification = require('../models/Notifications');
const { notifyPost, notifyUser } = require('../utils/sockets');

const { encode } = require('base64-arraybuffer');
const fs = require('fs');
const path = require('path');
// @desc    add like
// @route   POST /posts/:id/likes
// @access  Private

exports.addLike = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);

  if (post) {
    const user = await User.findById(userId, 'username pdp _id').exec();
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    const alreadyLiked = post.likes.find(
      (item) => item.userId.toString() === user._id.toString(),
    );
    if (alreadyLiked) {
      res.status(400);
      throw new Error('Post already liked');
    }
    const userData = {
      username: user.username,
      pdp: user.pdp,
      userId: user._id,
    };
    post.likes.push(userData);
    await post.save();
    if (post.userId.toString() !== userId) {
      const notification = new Notification({
        type: 'LIKE',
        targetUserId: post.userId,
        currentUser: userData,
        postId: req.params.id,
      });
      const notif = await notification.save();
      notifyUser('notification', post.userId, { notification: notif });
    }
    notifyPost('like', {
      userId: req.user.id,
      postId: post._doc._id,
      likes: post._doc.likes,
    });
    res.status(201).json({ message: 'Like added', post });
  } else {
    res.status(404);
    throw new Error('Post not found please reload the page!');
  }
});

// @desc    remove like
// @route   DELETE /posts/:id/likes
// @access  Private

exports.removeLike = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);

  if (post) {
    const user = await User.findById(userId, '_id').exec();
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const likes = [...post.likes];
    const index = likes.findIndex(
      (like) => like.userId.toString() === user._id.toString(),
    );
    if (index > -1) {
      post.likes.splice(index, 1);
      await post.save();
      await Notification.deleteOne({
        type: 'LIKE',
        postId: req.params.id,
        targetUserId: req.body.user,
      });
      notifyPost('like', {
        userId: req.user.id,
        postId: post._doc._id,
        likes: post._doc.likes,
      });

      res.status(201).json({ message: 'Like removed', post });
    } else {
      res.status(404);
      throw new Error('Like not found');
    }
  } else {
    res.status(404);
    throw new Error('Post not found please reload the page!');
  }
});

// @route POST api/posts
// @desc create new Post
// @access Private
exports.addPost = (req, res) => {
  const { caption } = req.body;
  //some validation
  if (!req.file && !caption && caption !== '')
    return res.status(400).json({ message: '2 fields cannot be empty' });

  var image = null;
  const dirname = __dirname.replace('\\server\\controller', '');
  if (req.file) {
    const base64String = fs.readFileSync(
      path.join(dirname + '/uploads/' + req.file.filename),
    );
    image = {
      data: encode(base64String),
      contentType: req.file.mimetype,
    };

    //delete file
    fs.unlink(path.join(dirname + '/uploads/' + req.file.filename), (err) => {
      if (err) throw new Error(err);
    });
  }

  User.findById(req.user.id)
    .then((user) => {
      const newPost = new Post({
        userId: user._id,
        image,
        caption,
      });
      newPost
        .save()
        .then((post) => {
          const postId = {
            postId: post._id,
          };
          user.posts.push(postId);
          post._doc.username = user.username;
          post._doc.pdp = user.pdp;

          // post["username"] = user.pdp;
          user
            .save()
            .then(() => res.status(201).json(post))
            .catch((err) =>
              res.status(400).json({ error: true, message: 'err' }),
            );
        })
        .catch((err) => res.status(400).json({ error: true, message: err }));
    })
    .catch((err) => res.status(400).json({ error: true, message: err }));
};

// @route Put api/posts/:id
// @desc  Update post
// @access Private
exports.updatePost = (req, res) => {
  const { caption } = req.body;
  const idPost = req.params.id;
  Post.findById(idPost)
    .then((post) => {
      post.caption = caption;
      post.save().then((updatedPost) => res.status(200).json(updatedPost));
    })
    .catch((err) =>
      res.status(400).json({ error: true, message: 'post not found' }),
    );
};

// @route delete api/posts/:id
// @desc  delete post
// @access Private
exports.deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  //delete Post
  const post = await Post.findById({ _id: postId });
  if (!post) return res.status(400).json({ message: 'post not found' });
  await post.remove();
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error('problems with this user');
  }
  //update User
  const index = user.posts.findIndex((post) => post.postId == postId);
  if (index > -1) {
    user.posts.splice(index, 1);
    await user.save();
  }

  //delete notification
  await Notification.deleteMany({ postId });
  return res.status(200).json({ message: 'Post deleted with success' });

  // Post.deleteOne({ _id: idPost })
  //   .then(() => {

  //     //delete Notification

  //     User.findById(req.user.id)
  //       .then((user) => {
  //         const index = user.posts.findIndex((post) => post.postId == idPost);
  //         if (index > -1) user.posts.splice(index, 1);

  //         user.save()
  //             .then(() =>
  //             res.status(200).json({ msg: 'post deleted with success' }),
  //           );
  //       })
  //       .catch((err) => res.status(400).json({ error: true, msg: err }));
  //   })
  //   .catch((err) =>
  //     res.status(400).json({ error: true, message: 'post not found' }),
  //   );
});

// @route get /api/posts/:id
// @desc  load post
// @access Private

exports.getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  let post = await Post.findById(postId);
  if (post) {
    const { pdp, username } = await User.findById(post.userId, 'pdp username');
    post = { ...post._doc, pdp, username };
    res.status(201).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});
