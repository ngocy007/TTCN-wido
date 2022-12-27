const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const { User, Comment } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token || req.headers["x-access-token"];

  if (!token) {
    return next(new ErrorHandler("Vui lòng đăng nhập", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findByPk(decodedData.id);
  next();
});

// kiểm tra tác gỉa
exports.checkAuthor = catchAsyncErrors(async (req, res, next) => {
  id = req.user.id_user;
  result = await Comment.findOne({ where: { id_com: req.params.id } });

  if (req.user.role == 2) {
    return next();
  }

  if (result.id_user == id || (await result.getPost()).id_user == id) {
    return next();
  }
  return next(new ErrorHandler("Bạn không có quyền", 401));
});
