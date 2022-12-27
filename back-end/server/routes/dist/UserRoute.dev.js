"use strict";

var router = require("express").Router();

var _require = require("../controllers/UserController"),
    createUser = _require.createUser,
    login = _require.login,
    logoutUser = _require.logoutUser,
    userDetails = _require.userDetails,
    followUser = _require.followUser,
    getAllUsers = _require.getAllUsers,
    checkFollow = _require.checkFollow,
    getUsersFLg = _require.getUsersFLg,
    getUsersFLr = _require.getUsersFLr,
    updateUser = _require.updateUser,
    searchUser = _require.searchUser,
    sendOTPCreate = _require.sendOTPCreate,
    isOTP = _require.isOTP,
    resetPassword = _require.resetPassword,
    sendOTPForgotPW = _require.sendOTPForgotPW,
    forgotPassword = _require.forgotPassword;

var _require2 = require("../middleware/auth"),
    isAuthenticatedUser = _require2.isAuthenticatedUser;

var _require3 = require("../middleware/cloudinary"),
    changeAva = _require3.changeAva;

var upload = require("../config/multet");

router.route("/search").get(isAuthenticatedUser, searchUser);
router.route("/sendOTP/Create").post(sendOTPCreate);
router.route("/sendOTP/ForgotPW").post(sendOTPForgotPW);
router.route("/forgotPassword").post(forgotPassword);
router.route("/isOTP").post(isOTP);
router.route("/").get(getAllUsers);
router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/update").put(isAuthenticatedUser, upload.single("image"), changeAva, updateUser);
router.route("/logout").get(logoutUser);
router.route("/info/:id").get(isAuthenticatedUser, userDetails);
router.route("/:id").post(isAuthenticatedUser, followUser).get(isAuthenticatedUser, checkFollow);
router.route("/listfollowing/:id").get(isAuthenticatedUser, getUsersFLg);
router.route("/listfollower/:id").get(isAuthenticatedUser, getUsersFLr);
router.route("/reset").get(isAuthenticatedUser, resetPassword);
module.exports = router;