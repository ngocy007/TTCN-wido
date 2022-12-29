const router = require("express").Router();
const {
  createUser,
  login,
  logoutUser,
  userDetails,
  followUser,
  getAllUsers,
  checkFollow,
  getUsersFLg,
  getUsersFLr,
  updateUser,
  searchUser,
  sendOTPCreate,
  isOTP,
  resetPassword,
  sendOTPForgotPW,
  forgotPassword,
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { changeAva } = require("../middleware/cloudinary");

const upload = require("../config/multet");

router.route("/search").get(isAuthenticatedUser, searchUser);

router.route("/sendOTP/Create").post(sendOTPCreate);

router.route("/sendOTP/ForgotPW").post(sendOTPForgotPW);

router.route("/forgotPassword").post(forgotPassword);

router.route("/isOTP").post(isOTP);

router.route("/").get(getAllUsers);

router.route("/register").post(createUser);

router.route("/login").post(login);

router
  .route("/update")
  .put(isAuthenticatedUser, upload.single("image"), changeAva, updateUser);

router.route("/logout").get(logoutUser);

router.route("/info/:id").get(isAuthenticatedUser, userDetails);

router
  .route("/:id")
  .post(isAuthenticatedUser, followUser)
  .get(isAuthenticatedUser, checkFollow);

router.route("/listfollowing/:id").get(isAuthenticatedUser, getUsersFLg);

router.route("/listfollower/:id").get(isAuthenticatedUser, getUsersFLr);

router.route("/reset").get(isAuthenticatedUser, resetPassword);

module.exports = router;