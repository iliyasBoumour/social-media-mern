const mongoose = require('mongoose');
const UserPayload = require('./UserPayload');
const Schema = mongoose.Schema;
const Image = require('./Image');
const PostSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  },
  { _id: false },
);
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: 'Bio',
    },
    pdp: Image,
    status: {
      type: Boolean,
      default: true,
    },
    posts: [PostSchema],
    followers: [UserPayload],
    following: [UserPayload],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
