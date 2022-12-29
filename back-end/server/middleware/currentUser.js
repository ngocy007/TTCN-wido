const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/mongo/userModel");

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const currentUser = await User.findOne({ email: req.user.email });
  req.currentUser = currentUser;
  next();
});
