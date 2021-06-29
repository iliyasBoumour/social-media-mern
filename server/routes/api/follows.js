const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const paramsValidation = require('../../middleware/paramsValidation');
const followsController = require('../../controller/followsController');
// router.route('/:id/followers').get(followsController.getFollowers);
// router.route('/:id/following').get(followsController.getFollowing);
router
  .route('/following/:id')
  .delete([auth, paramsValidation(['id'])], followsController.deleteFollowing);
router.route('/following').post(auth, followsController.addFollowing);

module.exports = router;
