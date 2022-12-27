const router  = require("express").Router();
const {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getDetailsPost
} = require("../controllers/PostController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { upload, deletefile } = require("../middleware/cloudinary");


router.route("/").get(isAuthenticatedUser,getAllPost);
router.route("/create").post(isAuthenticatedUser, upload, createPost);

router
  .route("/:id")
  .get(isAuthenticatedUser,getDetailsPost)
  .put(isAuthenticatedUser,updatePost)
  .delete(isAuthenticatedUser,deletefile, deletePost)
  

module.exports = router;