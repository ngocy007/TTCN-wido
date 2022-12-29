const router = require("express").Router();

const {
  statistic,
  grantPermission,
  deleteUser,
} = require("../controllers/adminController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { isAdmin } = require("../middleware/checkadmin");

router.route("/statistic").get(isAuthenticatedUser, isAdmin, statistic);
router
  .route("/grantPermission/:id")
  .post(isAuthenticatedUser, isAdmin, grantPermission);

router.route("/:id").delete(isAuthenticatedUser, isAdmin, deleteUser);

module.exports = router;
