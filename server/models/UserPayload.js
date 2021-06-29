const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./Image');
module.exports = UserShema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    pdp: Image,
    isFollow: {
      type: Boolean
    }
  },
  { _id: false },
);
