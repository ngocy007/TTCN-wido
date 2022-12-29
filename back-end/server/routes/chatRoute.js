const chatCtrl = require("../controllers/chatController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { currentUser } = require("../middleware/currentUser");
const router = require("express").Router();

router
  .route("/")
  .get(isAuthenticatedUser, currentUser, chatCtrl.getAllGroupChat)
  .post(isAuthenticatedUser, currentUser, chatCtrl.CreateGroupChat);

// router.post("/create", isAuthenticatedUser, chatCtrl.CreateGroupChat);

//Rename Group
router.put("/rename", isAuthenticatedUser, chatCtrl.RenameFromGroup);

//Add To Group
router.put("/groupadd", isAuthenticatedUser, chatCtrl.AddToGroup);

//Remove From Group
router.put("/groupremove", isAuthenticatedUser, chatCtrl.RemoveFromGroup);

//Access user to Group
router.post("/access", isAuthenticatedUser, chatCtrl.accessChat);

//get all users chat
router.post("/users", isAuthenticatedUser, chatCtrl.getAllUsers);

module.exports = router;
