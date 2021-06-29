const Notification = require('../models/Notifications');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');


exports.addNotification = asyncHandler( async(req, res) => {
    const { type, targetUserId, postId } = req.body;

    const _currentUser = await User.findById(req.user.id);
    const userPayload = {
        userId: _currentUser._id,
        username: _currentUser.username,
        pdp: _currentUser.pdp
    };

    const newNotification = new Notification({
        type,
        targetUserId,
        currentUser: userPayload,
        postId
    });

    await newNotification.save();
    
    return res.status(200).json(newNotification);
});

exports.getNotifications = asyncHandler( async(req, res) => {
    const _currentUserId = req.user.id;
    const notifications = await Notification.find({targetUserId: _currentUserId});
    return res.status(200).json(notifications);
})