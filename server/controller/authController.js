const asyncHandler = require('express-async-handler');
const User = require('../models/User');
//JWT
const jwt = require('jsonwebtoken');
//Bcryptjs
const bcrypt = require('bcryptjs');
const { getHashPassowrd } = require('../config/salt');
//@Method Register
//desc register new User
//acess Public

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    pdp: null,
    password: getHashPassowrd(password),
  });

  const user = await newUser.save();

  jwt.sign({ id: user._id }, process.env.jwtKeySecret, (err, token) => {
    if (err) throw err;
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Invalid Credentials !!!');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return res.status(400).json({ msg: 'invalid cccerrr' });
  }
  user.status = true;
  await user.save();
  jwt.sign({ id: user.id }, process.env.jwtKeySecret, (err, token) => {
    if (err) throw err;
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

exports.logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error('Invalid Credentials !!!');
  }
  user.status = false;
  await user.save();
  return res.status(200).json({ message: 'logout with success' });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const currentUser = await User.findById(req.user.id);
  const isEqual = await bcrypt.compare(req);
  if (!isEqual) {
    res.status(400);
    throw new Error('old password is incorrect');
  }
  user.password = getHashPassowrd(newPassword);
  await user.save();

  return res.status(200).json({ message: 'password changed with success' });
});

exports.getAuth = (req, res) => {
  if(!req.user.id)
    return res.status(400).json({error: "problem with token"});
  User.findById(req.user.id)
    .select('-password -tokens')
    .then((user) =>
      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        status: user.status,
        bio: user.bio,
        pdp: user.pdp,
        postsCount: user.posts.length,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      }),
    );
};
