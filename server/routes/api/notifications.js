const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { notificationValidation } = require('../../middleware/postsValidation');
const notificationController = require('../../controller/notificationController');


router.post('/',[auth, notificationValidation], notificationController.addNotification);
router.get('/', auth, notificationController.getNotifications);
module.exports = router;