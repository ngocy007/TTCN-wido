const router = require("express").Router();

const {
  commentCreate,
  commentDelete,
  getMoreComments,
} = require("../controllers/CommentController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, commentCreate);
router
  .route("/:id")
  .get(isAuthenticatedUser, getMoreComments)
  .delete(isAuthenticatedUser, commentDelete);

module.exports = router;
