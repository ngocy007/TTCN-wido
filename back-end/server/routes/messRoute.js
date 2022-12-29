const messageCtrl = require("../controllers/messController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { currentUser } = require("../middleware/currentUser");
const router = require("express").Router();

//Get All Message
router.get(
  "/:chatId",
  isAuthenticatedUser,
  currentUser,
  messageCtrl.AllMessages
);
//Send Message
router.post("/send", isAuthenticatedUser, currentUser, messageCtrl.SendMessage);

module.exports = router;
