"use strict";

var router = require("express").Router();

var _require = require("../controllers/PostController"),
    createPost = _require.createPost,
    getAllPost = _require.getAllPost,
    updatePost = _require.updatePost,
    deletePost = _require.deletePost,
    getDetailsPost = _require.getDetailsPost;

var _require2 = require("../middleware/auth"),
    isAuthenticatedUser = _require2.isAuthenticatedUser;

var _require3 = require("../middleware/cloudinary"),
    deletefile = _require3.deletefile,
    uploadCloudinary = _require3.uploadCloudinary;

var upload = require("../config/multet");

router.route("/home").get(isAuthenticatedUser, getAllPost);
router.route("/create").post(isAuthenticatedUser, upload.array("image", 12), uploadCloudinary, createPost);
router.route("/:id").get(isAuthenticatedUser, getDetailsPost).put(isAuthenticatedUser, updatePost)["delete"](isAuthenticatedUser, deletefile, deletePost);
module.exports = router;