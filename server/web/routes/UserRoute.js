const express = require("express");
const {
  createUser,
  login,
  logoutUser,
  userDetails
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/registration").post(createUser);

router.route("/login").post(login);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, userDetails);

module.exports = router;
