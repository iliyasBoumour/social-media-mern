const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

exports.getConversations = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userExist = await User.exists({ _id: id });
  if (userExist) {
    const Conv = await Conversation.find({ members: id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(Conv);
  } else {
    res.status(400).json({
      message: `this user does not exists !`,
    });
  }
});
exports.createConversation = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.body;
  if (sender && receiver && sender !== receiver) {
    const newConv = new Conversation({
      members: [sender, receiver],
    });
    const Conv = await newConv.save();
    res.status(201).json(Conv);
  } else {
    res.status(400).json({
      message: `sender id or receiver id are not good !`,
    });
  }
});

exports.getOneConv = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne(
    {
      members: { $all: [req.params.id1, req.params.id2] },
    },
    { updatedAt: 1 }
  );
  if (conversation) {
    res.status(200).json(conversation);
  } else {
    const otherUserExists = User.exists({ _id: req.params.id1 });
    if (otherUserExists) {
      const newConv = new Conversation({
        members: [req.params.id1, req.params.id2],
      });
      const Conv = await newConv.save();
      res.status(201).json(Conv);
    }
  }
});
