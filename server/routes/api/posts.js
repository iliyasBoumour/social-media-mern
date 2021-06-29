const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const commentController = require('../../controller/commentController');
const auth = require('../../middleware/auth');
const paramsValidation = require('../../middleware/paramsValidation');
const {
  addPostValidation,
  commentValidation,
} = require('../../middleware/postsValidation');
const errorMiddleware = require('../../middleware/errorMiddleware');
const errorHandler = require('../../middleware/errorMiddleware');

const uploadImage = require('../../middleware/uploadImage');

router.route('/:id/likes').post(auth, postController.addLike);
router.route('/:id/likes').delete(auth, postController.removeLike);

//partie brahim
router.post('/', [auth, uploadImage.single('image')], postController.addPost);
router
  .route('/:id')
  .put(auth, postController.updatePost)
  .delete(auth, postController.deletePost)
  .get(auth, postController.getPost);

//management comments routes
router.post('/:id/comments', [auth,paramsValidation(['id'])], commentController.addComment);
router.get('/:idPost/comments/:bo', paramsValidation(['idPost', 'bo']), commentController.getComments);
router.route('/:idPost/comments/:idComment')
      .put([auth,paramsValidation(['idPost','idComment']), commentValidation], commentController.updateComment)
      .delete([auth,paramsValidation(['idPost','idComment'])], commentController.deleteComent);
      
module.exports = router;

