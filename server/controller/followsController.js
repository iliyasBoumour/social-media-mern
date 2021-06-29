const asyncHandler = require('express-async-handler');
const Notifications = require('../models/Notifications');
const Post = require('../models/Posts');
const User = require('../models/User');
const { notifyPost, notifyUser } = require('../utils/sockets');

exports.getFollowers = asyncHandler(async (req, res) => {
  User.findById({ _id: req.user.id }, async (err, data) => {
    if (err) {
      await res.status(500).json({
        message: 'error',
        err: err,
      });
    } else {
      if (data.followers.length == 0) {
        res.status(200).json({
          message: 'there is no followers',
        });
      } else {
        res.status(200).json({
          followers: data.followers,
        });
      }
    }
  });
});
exports.getFollowing = asyncHandler(async (req, res) => {
  User.findById({ _id: req.user.id }, async (err, data) => {
    if (err) {
      await res.status(500).json({
        message: 'error',
        err: err,
      });
    } else {
      if (data.following.length == 0) {
        res.status(200).json({
          message: 'there is no following',
        });
      } else {
        res.status(200).json({
          following: data.following,
        });
      }
    }
  });
});
exports.deleteFollowing = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status('400').json({ error: 'user not found' });

  await User.findByIdAndUpdate(
    { _id: req.user.id },
    {
      $pull: {
        following: {
          userId: req.params.id,
        },
      },
    },
  );

  await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        followers: {
          userId: req.user.id,
        },
      },
    },
  );

  return res
    .status(200)
    .json({ message: 'this following are deleted with success' });
});

exports.addFollowing = asyncHandler(async (req, res) => {
  const targetId = req.body.id;
  if (!targetId || targetId === '')
    return res.status(200).json({ error: 'some fields cannot be empty' });
  const currentUser = await User.findById(req.user.id);
  const targetUser = await User.findById(targetId);
  const found = currentUser.following.find(
    (fl) => fl.userId.toString() === targetId.toString(),
  );

  if (found)
    return res.status(400).json({ message: 'this follow are already exist' });
  currentUser.following.push({
    userId: targetUser._id,
    username: targetUser.username,
    pdp: targetUser.pdp,
  });
  await currentUser.save();

  targetUser.followers.push({
    userId: currentUser._id,
    username: currentUser.username,
    pdp: currentUser.pdp,
  });
  await targetUser.save();

  //add notification
  const userPayload = {
    userId: currentUser._id,
    username: currentUser.username,
    pdp: currentUser.pdp,
  };
  const newNotification = new Notifications({
    type: 'FOLLOW',
    targetUserId: targetId,
    currentUser: userPayload,
    postId: null,
  });

  await newNotification.save();
  notifyUser('notification', targetId, { notification: newNotification });

  return res.status(201).json({ message: 'add following with success' });
});
