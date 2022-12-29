"use strict";

var cloudinary = require("cloudinary").v2;

var catchAsyncErrors = require("./catchAsyncErrors");

var ErrorHandler = require("../utils/ErrorHandler");

var _require = require("../models"),
    Post = _require.Post;

var fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}); // Tải ảnh của post lên cloudinary

exports.uploadCloudinary = catchAsyncErrors(function _callee(req, res, next) {
  var linkFiles, newFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, path, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          linkFiles = [];
          newFiles = req.files;

          if (newFiles) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", next(new ErrorHandler("Rỗng", 404)));

        case 4:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;
          _iterator = newFiles[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 20;
            break;
          }

          file = _step.value;
          path = file.path;
          _context.next = 14;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(path, {
            folder: "file_post"
          }));

        case 14:
          result = _context.sent;
          linkFiles.push(result.url);
          fs.unlinkSync(path);

        case 17:
          _iteratorNormalCompletion = true;
          _context.next = 9;
          break;

        case 20:
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 26:
          _context.prev = 26;
          _context.prev = 27;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 29:
          _context.prev = 29;

          if (!_didIteratorError) {
            _context.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context.finish(29);

        case 33:
          return _context.finish(26);

        case 34:
          req.newFile = linkFiles;
          next();

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 22, 26, 34], [27,, 29, 33]]);
}); // Xóa ảnh trong post

exports.deletefile = catchAsyncErrors(function _callee2(req, res, next) {
  var post, photos, i, photoUrl;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Post.findOne({
            where: {
              id_post: req.params.id
            }
          }));

        case 2:
          post = _context2.sent;

          if (post) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("không tìm thấy bài viết", 404)));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(post.getPhotos());

        case 7:
          photos = _context2.sent;
          i = 0;

        case 9:
          if (!(i < photos.length)) {
            _context2.next = 16;
            break;
          }

          photoUrl = photos[i].url;
          _context2.next = 13;
          return regeneratorRuntime.awrap(cloudinary.uploader.destroy(photoUrl.slice(photoUrl.indexOf("file"), photoUrl.lastIndexOf("."))));

        case 13:
          i++;
          _context2.next = 9;
          break;

        case 16:
          next();

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Đổi avatar

exports.changeAva = catchAsyncErrors(function _callee3(req, res, next) {
  var avatar, result1, result2;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          avatar = req.user.image;

          if (req.file) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", next());

        case 3:
          if (!(req.user.image != "https://bulma.io/images/placeholders/128x128.png")) {
            _context3.next = 7;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(cloudinary.uploader.destroy(avatar.slice(avatar.indexOf("avatars"), avatar.lastIndexOf("."))));

        case 6:
          result1 = _context3.sent;

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(req.file.path, {
            folder: "avatars"
          }));

        case 9:
          result2 = _context3.sent;
          fs.unlinkSync(req.file.path);
          req.newAva = result2.url;
          next();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
});