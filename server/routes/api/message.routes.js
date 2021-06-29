const router = require("express").Router();
const msgController = require("../../controller/message.controller");
const auth = require("../../middleware/auth");

router.post("/", auth, msgController.createMessage);
router.get("/:convId", auth, msgController.getMessages);
module.exports = router;
