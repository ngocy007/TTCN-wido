const router = require("express").Router();
const {
  createPost,
  getAllPost,
  deletePost,
  getDetailsPost,
} = require("../controllers/PostController");
const { isAuthenticatedUser, checkAuthorPost } = require("../middleware/auth");
const { deletefile, uploadCloudinary } = require("../middleware/cloudinary");

const upload = require("../config/multet");

router.route("/home").get(isAuthenticatedUser, getAllPost);
router
  .route("/create")
  .post(
    isAuthenticatedUser,
    upload.array("multiple", 12),
    uploadCloudinary,
    createPost
  );

router
  .route("/:id")
  .get(isAuthenticatedUser, getDetailsPost)
  .delete(isAuthenticatedUser, checkAuthorPost, deletefile, deletePost);

module.exports = router;
