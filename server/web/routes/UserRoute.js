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
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { changeAva } = require("../middleware/cloudinary");

router.route("/").get(getAllUsers);

router.route("/register").post(createUser);

router.route("/login").post(login);

router.route("/update").put(isAuthenticatedUser,changeAva,updateUser);

router.route("/logout").get(logoutUser);

router.route("/info/:id").get(isAuthenticatedUser, userDetails);

router
  .route("/:id")
  .post(isAuthenticatedUser, followUser)
  .get(isAuthenticatedUser, checkFollow);

router.route("/listfollowing/:id").get(isAuthenticatedUser, getUsersFLg);

router.route("/listfollower/:id").get(isAuthenticatedUser, getUsersFLr);

module.exports = router;
