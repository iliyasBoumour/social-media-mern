const { checkSchema, validationResult } = require('express-validator');
const mongoose = require('mongoose');
//import Model
const Post = require('../models/Posts');
const User = require('../models/User');

//addPost shema

const addPostShema = {
  caption: {
    custom: {
      options: (value, { req }) => {
        if (!value && value == '')
          if (!req.body.image)
            throw new Error('les 2 champs ne peuvent pas etre vide');
        return true;
      },
    },
  },
  image: {
    custom: {
      options: (value, { req }) => {
        if (!value)
          if (!req.body.caption && req.body.caption === '')
            throw new Error('les 2 champs ne peuvent pas etre vide');
        return true;
      },
    },
  },
};

const updatePostShema = {
  caption: {
    notEmpty: {
      errorMessage: 'caption field cannot be empty',
    },
  },
};

//add notification shema
const notificationShema = {
  type: {
    notEmpty: {
      errorMessage: 'type field cannot be empty',
    },
  },
  targetUserId: {
    custom: {
      options: (value) => {
        if (!value || value == '')
          throw new Error('targetUser cannot be empty');
        if (!mongoose.Types.ObjectId.isValid(value))
          throw new Error('id not valid');
        User.findById(value).then((user) => {
          if (!user) throw new Error('this target user is not found');
        });
        return true;
      },
    },
  },
  postId: {
    custom: {
      options: (value) => {
        if (!value || value == '') throw new Error('postId cannot be empty');
        if (!mongoose.Types.ObjectId.isValid(value))
          throw new Error('id not valid');
        Post.findById(value).then((post) => {
          if (!post) throw new Error('this post is not found');
        });
        return true;
      },
    },
  },
};

//custom errors messages
const customErrors = (errors) => {
  const myErrors = {};
  errors.map((error) => {
    myErrors[error.param] = { msg: error.msg };
  });

  return myErrors;
};

//management comments validation
const commentShema = {
  comment: {
    notEmpty: {
      errorMessage: 'comment does not be empty',
    },
  },
};

//validation Middeleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: customErrors(errors.errors),
    });
  };
};

exports.addPostValidation = validate(checkSchema(addPostShema));
exports.updatePostValidation = validate(checkSchema(updatePostShema));
exports.commentValidation = validate(checkSchema(commentShema));
exports.notificationValidation = validate(checkSchema(notificationShema));
