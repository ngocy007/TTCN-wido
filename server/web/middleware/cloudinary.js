require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { Post } = require("../models");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tải ảnh lên cloudinary
exports.upload = catchAsyncErrors(async (req, res, next) => {
  const linkFiles = [];
  const newFiles = req.body.file;
  if (!newFiles) {
    return next(new ErrorHandler("Rỗng", 404));
  }

  for (let i = 0; i < newFiles.length; i++) {
    const result = await cloudinary.uploader.upload(newFiles[i], {
      folder: "file_post",
    });
    linkFiles.push(result.url);
  }
  req.newFile = linkFiles;
  next();
});

// Xóa ảnh
exports.deletefile = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findOne({ where: { id_post: req.params.id } });
  if (!post) {
    return next(new ErrorHandler("không tìm thấy bài viết", 404));
  }

  const photos = await post.getPhotos();
  for (let i = 0; i < photos.length; i++) {
    const photoUrl = photos[i].url;
    await cloudinary.uploader.destroy(
      photoUrl.slice(photoUrl.indexOf("file"), photoUrl.lastIndexOf("."))
    );
  }
});
