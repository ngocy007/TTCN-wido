const cloudinary = require("cloudinary").v2;
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { Post } = require("../models");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tải ảnh của post lên cloudinary

exports.uploadCloudinary = catchAsyncErrors(async (req, res, next) => {
  const linkFiles = [];
  const newFiles = req.files;
  if (!newFiles || newFiles.length === 0) {
    return next(new ErrorHandler("Rỗng", 404));
  }

  for (const file of newFiles) {
    const { path } = file;
    const result = await cloudinary.uploader.upload(path, {
      folder: "file_post",
    });
    linkFiles.push(result.url);
    fs.unlinkSync(path);
  }
  req.newFile = linkFiles;
  next();
});

// Xóa ảnh trong post
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
  next();
});

// Đổi avatar
exports.changeAva = catchAsyncErrors(async (req, res, next) => {
  const avatar = req.user.image;

  if (!req.file) {
    return next();
  }

  if (req.user.image != "https://bulma.io/images/placeholders/128x128.png") {
    const result1 = await cloudinary.uploader.destroy(
      avatar.slice(avatar.indexOf("avatars"), avatar.lastIndexOf("."))
    );
  }

  const result2 = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars",
  });
  fs.unlinkSync(req.file.path);

  req.newAva = result2.url;
  next();
});
