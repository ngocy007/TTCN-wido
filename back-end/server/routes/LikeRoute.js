const router = require("express").Router();
const { likeComment, getUsersLCM } = require("../controllers/CommentController");
const { getUsersLP, likePost } = require("../controllers/PostController");
const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/post/:id")
  .post(isAuthenticatedUser, likePost)
  .get(isAuthenticatedUser, getUsersLP);

router
  .route("/comment/:id")
  .post(isAuthenticatedUser, likeComment)
  .get(isAuthenticatedUser, getUsersLCM);
module.exports = router;
