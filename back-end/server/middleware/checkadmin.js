const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const { User, Comment } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
  const is_admin = req.user.role;

  if (is_admin == 1) {
    return next(new ErrorHandler("you are not admin", 404));
  }

  next();
});
