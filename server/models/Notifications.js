const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserPayload = require('./UserPayload');

const NotificationtSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    targetUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    currentUser: UserPayload,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Notification', NotificationtSchema);
