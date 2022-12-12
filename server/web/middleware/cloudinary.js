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

exports.upload = catchAsyncErrors(async (req, res, next) => {
  const newFileLink = [];
  const newFile = req.body.file;
  if (!newFile) {
    return next(new ErrorHandler("Rỗng", 404));
  }

  for (let i = 0; i < newFile.length; i++) {
    const result = await cloudinary.uploader.upload(newFile[i], {
      folder: "file_post",
    });
    newFileLink.push(result.url);
  }
  req.newFile = newFileLink;
  next();
});

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
