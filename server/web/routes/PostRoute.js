const express = require("express");
const {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/PostController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { upload, deletefile } = require("../middleware/cloudinary");

const router = express.Router();

router.route("/").get(isAuthenticatedUser,getAllPost);

router.route("/create").post(isAuthenticatedUser, upload, createPost);

router
  .route("/:id")
  .put(isAuthenticatedUser,updatePost)
  .delete(isAuthenticatedUser,deletefile, deletePost)
  .post(isAuthenticatedUser,likePost);

module.exports = router;
