const router = require("express").Router();

const {
  commentCreate,
  commentDelete,
  getMoreComments,
  getReplyCom,
} = require("../controllers/CommentController");

const { isAuthenticatedUser,checkAuthor } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, commentCreate);
router
  .route("/:id")
  .get(isAuthenticatedUser, getMoreComments)
  .delete(isAuthenticatedUser,checkAuthor, commentDelete);

router.route("/more/:id").get(isAuthenticatedUser, getReplyCom);
module.exports = router;
