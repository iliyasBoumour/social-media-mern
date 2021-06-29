const { json } = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Posts");
const User = require("../models/User");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { encode } = require("base64-arraybuffer");
// @desc    get posts
// @route   GET /users/id/posts?all=true
// @access  Private

exports.getPosts = asyncHandler(async (req, res) => {
  const all = req.query.all === "true";
  const userId = req.params.id;
  const user = await User.findById(userId, "_id following");
  if (user) {
    const followingIds = user.following.map((f) => f.userId);
    const ids = all ? [...followingIds, userId] : [userId];
    const posts = await Post.find({
      userId: {
        $in: ids,
      },
    }).sort({
      createdAt: -1,
    });

    const users = await User.find(
      {
        _id: {
          $in: ids,
        },
      },
      {
        pdp: 1,
        username: 1,
      }
    );
    const postsList = posts.map((p) => {
      const { pdp, username } = users.find(
        (u) => u._id.toString() === p.userId.toString()
      );
      const isLiked = !!p._doc.likes.find(
        (l) => l.userId.toString() === req.user.id.toString()
      );
      return { ...p._doc, pdp, username, isLiked };
    });

    res.json(postsList);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    get user info (name, email, _id, pdp, status, followers[user], following[user]);
// @route   GET /users/id
// @access  Private

exports.getUserInfo = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const currentUser = await User.findById(req.user.id);
  const user = await User.findById(userId).select(
    "-password -posts -__v -createdAt -updatedAt"
  );
  if (user) {
    //traitement following and followers
    user.following.map((fl) => {
      const found = currentUser.following.find(
        (cf) => cf.userId.toString() === fl.userId.toString()
      );
      found ? (fl.isFollow = true) : (fl.isFollow = false);
      return fl;
    });
    user.followers.map((fl) => {
      const found = currentUser.following.find(
        (cf) => cf.userId.toString() === fl.userId.toString()
      );
      found ? (fl.isFollow = true) : (fl.isFollow = false);
      return fl;
    });
    //found follow
    const found = currentUser.following.find((fl) => fl.userId == userId);
    user._doc.isFollow = found ? true : false;
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { username, bio } = req.body;
  if (!username | (username === ""))
    return res.status(400).json({ error: "Username cannot be empty" });
  var pdp = null;
  const dirname = __dirname.replace("\\server\\controller", "");
  if (req.file) {
    const base64String = fs.readFileSync(
      path.join(dirname + "/uploads/" + req.file.filename)
    );
    pdp = {
      data: encode(base64String),
      contentType: req.file.mimetype,
    };

    //delete file
    fs.unlink(path.join(dirname + "/uploads/" + req.file.filename), (err) => {
      if (err) throw new Error(err);
    });
  }
  //update user
  const currentUser = await User.findById(req.user.id);
  currentUser.username = username;
  currentUser.bio = bio && bio !== "" ? bio : "Bio";
  currentUser.pdp = pdp ? pdp : currentUser.pdp;
  await currentUser.save();

  const followingIds = currentUser.following.map((fl) =>
    mongoose.Types.ObjectId(fl.userId)
  );

  const followingUsers = await User.find({ _id: { $in: followingIds } });
  followingUsers.forEach(
    asyncHandler(async (fl) => {
      const index = fl.followers.findIndex((t) => t.userId == req.user.id);
      if (index > -1) {
        fl.followers[index].username = username;
        fl.followers[index].pdp = pdp;
        await fl.save();
      }
    })
  );

  const followersId = currentUser.followers.map((fl) =>
    mongoose.Types.ObjectId(fl.userId)
  );
  const followerUsers = await User.find({ _id: { $in: followersId } });
  followerUsers.forEach(
    asyncHandler(async (fl) => {
      const index = fl.following.findIndex((t) => t.userId == req.user.id);
      if (index > -1) {
        fl.following[index].username = username;
        fl.following[index].pdp = pdp;
        await fl.save();
      }
    })
  );

  //update comment && likes
  const posts = await Post.find({});
  posts.forEach(
    asyncHandler(async (post) => {
      //update comments
      const index1 = post.comments.findIndex((cm) => cm.userId == req.user.id);
      if (index1 > -1) {
        post.comments[index1].username = username;
        post.comments[index1].pdp = pdp;
        await post.save();
      }
      //update likes
      const index2 = post.likes.findIndex((lk) => lk.userId == req.user.id);
      if (index2 > -1) {
        post.likes[index2].username = username;
        post.likes[index2].pdp = pdp;
        await post.save();
      }
    })
  );

  res.status(200).json({ message: "user updated with success" });

  //return res.status.json({message: "user updated with success"});
});

// @desc    remove account
// @route   DELETE /users/id
// @access  Private

exports.removeUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    await user.remove();
    await Post.deleteMany({ userId });
    await Post.updateMany(
      {},
      {
        $pull: {
          like: { userId: userId },
          comments: { userId: userId },
        },
      },
      { multi: true }
    );
    await User.updateMany(
      {},
      {
        $pull: {
          followers: { userId: userId },
          following: { userId: userId },
        },
      },
      { multi: true }
    );
    res.json({ message: "User's account removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.getUsers = asyncHandler(async (req, res) => {
  const q = req.query.q ? req.query.q : "";
  var users = [];
  if (q != "")
    users = await User.find(
      { username: { $regex: q.toLowerCase(), $options: "i" } },
      "username pdp"
    ).exec();
  res.status(200).json(users);
});

exports.getSuggestion = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id);

  const map = currentUser.following.map((fl) =>
    mongoose.Types.ObjectId(fl.userId)
  );
  map.push(mongoose.Types.ObjectId(req.user.id));

  const suggestions = await User.aggregate([
    { $match: { _id: { $nin: map } } },
    { $sample: { size: 10 } },
    { $project: { _id: 1, username: 1, pdp: 1 } },
  ]);
  res.status(200).json(suggestions);
});

// exports.updateUser = asyncHandler(async(req, res) => {
//     const {username, bio, email, pdp}
// })
