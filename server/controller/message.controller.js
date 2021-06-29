const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.getMessages = asyncHandler(async (req, res) => {
  const { convId } = req.params;
  const convExist = await Conversation.exists({ _id: convId });
  if (convExist) {
    const messages = await Message.find(
      { conversationId: convId },
      { sender: 1, text: 1, createdAt: 1 }
    );
    res.status(200).json(messages);
  } else {
    res.status(400).json({
      message: `conv don't exists !`,
    });
  }
});
exports.createMessage = asyncHandler(async (req, res) => {
  const { conversationId, sender, text } = req.body;
  if (conversationId && text && sender) {
    await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { $set: { lastMessage: text } },
      { new: true },
      (err, doc) => {
        if (err || doc === null) {
          res.status(400).json({
            message: `bad params !`,
          });
        }
      }
    );
    const newMsg = new Message(req.body);
    const Msg = await newMsg.save();
    res.status(201).json(Msg);
  } else {
    res.status(400).json({
      message: `bad params !`,
    });
  }

  // if (conversationId && text && sender && isPartOfConv) {
  //   const newMsg = new Message(req.body);
  //   const Msg = await newMsg.save();
  //   res.status(201).json(Msg);
  // } else {
  //   res.status(400).json({
  //     message: `bad params !`,
  //   });
  // }
});
