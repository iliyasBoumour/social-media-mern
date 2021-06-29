
const User = require('../models/User');
const asyncHandler = require('express-async-handler');


exports.updateFollowers = asyncHandler(async(currentUser_id, following_id) => {
    const user = await User.findById(currentUser_id);

    const index = user.followers.findIndex(fl => fl.userId == following_id);
    if(index > -1) {
        user.followers[index].isFollow = !user.followers[index].isFollow;
    }
});