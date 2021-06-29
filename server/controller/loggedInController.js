const asyncHandler = require("express-async-handler");
const User = require("../models/User");

exports.getLoggedIn = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let loggedIn = await User.find(
    { status: true },
    { _id: 1, pdp: 1, username: 1, status: 1 }
  );
  let friends = await User.findOne({ _id: id }, { _id: 0, following: 1 });
  friends = friends?.following?.map((friend) => friend.userId);
  loggedIn = loggedIn.filter((user) => friends.includes(user._id));
  res.status(200).json(loggedIn);
});
