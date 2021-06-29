const express = require('express');
const router = express.Router();

//auth controller
const authController = require('../../controller/authController');
//auth validation middlewares
const { loginValidation, registerValidation } = require('../../middleware/authValidation');
//auth validation token middleware
const auth = require('../../middleware/auth');



router.post('/login',loginValidation, authController.login);
router.post('/register',registerValidation, authController.register);
router.get('/logout', auth, authController.logout);
router.get('/auth',auth, authController.getAuth);


module.exports = router;