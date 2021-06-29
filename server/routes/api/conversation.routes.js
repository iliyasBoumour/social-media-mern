const router = require("express").Router();
const convController = require("../../controller/conversation.controller");
const auth = require("../../middleware/auth");

router.post("/", auth, convController.createConversation);
router.get("/:id", auth, convController.getConversations);
router.get("/:id1/:id2", auth, convController.getOneConv);
module.exports = router;
