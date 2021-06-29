const router = require("express").Router();
const loggedInController = require("../../controller/loggedInController");
const auth = require("../../middleware/auth");
router.get("/:id", auth, loggedInController.getLoggedIn);
module.exports = router;
