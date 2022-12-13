const router  = require("express").Router();
const {
  createUser,
  login,
  logoutUser,
  userDetails,
  followUser,
  getAllUsers
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/").get(getAllUsers);

router.route("/register").post(createUser);

router.route("/login").post(login);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, userDetails);

router.route("/:id").post(isAuthenticatedUser, followUser);

module.exports = router;
