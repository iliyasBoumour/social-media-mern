const mongoose = require('mongoose');

function paramsValidation(ids) {
  return function (req, res, next) {
    //
    ids.forEach((id) => {
      if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
        res.status(400);
        throw new Error('my params !! not valid');
      }
    });

    next();
  };
}

module.exports = paramsValidation;
