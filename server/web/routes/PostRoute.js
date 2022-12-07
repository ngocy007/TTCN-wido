const express = require("express");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require ("../controllers/PostController");

const router = express.Router();

router.route("/post/create").post(createPost);

router.route("/posts").get(getPost);

router.route("/post/:id").put(updatePost).delete(deletePost);

module.exports = router;
