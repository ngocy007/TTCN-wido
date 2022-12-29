"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../models"),
    Photo = _require.Photo,
    Post = _require.Post,
    Like_Post = _require.Like_Post,
    User = _require.User,
    Comment = _require.Comment;

var Sequelize = require("sequelize");

var _require2 = require("sequelize"),
    Op = _require2.Op; // const cloudinary = require("../config/cloudinary");


var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}); // Lấy dữ liệu tất cả bài viết

exports.getAllPost = function _callee(req, res) {
  var rawPosts, processPosts, posts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, post, isLike, countLike, like, _ref, count, countCmt;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Post.findAll({
            include: [{
              model: Photo,
              attributes: ["url"]
            }, {
              model: User,
              attributes: ["name", "image", "id_user"]
            }],
            limit: req.query._limit,
            offset: req.query._limit * req.query._page
          }));

        case 2:
          rawPosts = _context.sent;
          processPosts = rawPosts.map(function (e) {
            return e.get({
              plain: true
            });
          });
          posts = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;
          _iterator = processPosts[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 30;
            break;
          }

          post = _step.value;
          isLike = false;
          countLike = 0;
          _context.next = 16;
          return regeneratorRuntime.awrap(Like_Post.findOne({
            where: _defineProperty({}, Op.and, [{
              id_post: post.id_post
            }, {
              id_user: req.user.id_user
            }])
          }));

        case 16:
          like = _context.sent;

          if (like) {
            isLike = true;
          }

          _context.next = 20;
          return regeneratorRuntime.awrap(Like_Post.findAndCountAll({
            where: {
              id_post: post.id_post
            }
          }));

        case 20:
          _ref = _context.sent;
          count = _ref.count;
          countLike = count;
          _context.next = 25;
          return regeneratorRuntime.awrap(Comment.findAll({
            where: {
              id_post: post.id_post
            }
          }).then(function (e) {
            return e.length;
          }));

        case 25:
          countCmt = _context.sent;
          posts.push(_objectSpread({}, post, {
            isLike: isLike,
            countLike: countLike,
            countCmt: countCmt
          }));

        case 27:
          _iteratorNormalCompletion = true;
          _context.next = 10;
          break;

        case 30:
          _context.next = 36;
          break;

        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 36:
          _context.prev = 36;
          _context.prev = 37;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 39:
          _context.prev = 39;

          if (!_didIteratorError) {
            _context.next = 42;
            break;
          }

          throw _iteratorError;

        case 42:
          return _context.finish(39);

        case 43:
          return _context.finish(36);

        case 44:
          res.status(200).json({
            success: true,
            posts: posts
          });

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 32, 36, 44], [37,, 39, 43]]);
}; // Xem chi tiết Post


exports.getDetailsPost = function _callee2(req, res) {
  var rawPosts, processPosts, isLike, countLike, like, _ref2, count, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, post;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Post.findOne({
            where: {
              id_post: req.params.id
            },
            include: [{
              model: Photo,
              attributes: ["url"]
            }, {
              model: User,
              attributes: ["name", "image"]
            }, {
              include: {
                model: User,
                attributes: ["name", "image", "id_user"]
              },
              model: Comment,
              attributes: ["id_com", "id_post", "content", "created_at"],
              separate: true,
              limit: 15,
              where: {
                reply: null
              }
            }]
          }));

        case 2:
          rawPosts = _context2.sent;
          processPosts = rawPosts.get({
            plain: true
          });
          isLike = false;
          countLike = 0;
          _context2.next = 8;
          return regeneratorRuntime.awrap(Like_Post.findOne({
            where: _defineProperty({}, Op.and, [{
              id_post: processPosts.id_post
            }, {
              id_user: req.user.id_user
            }])
          }));

        case 8:
          like = _context2.sent;

          if (like) {
            isLike = true;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(Like_Post.findAndCountAll({
            where: {
              id_post: processPosts.id_post
            }
          }));

        case 12:
          _ref2 = _context2.sent;
          count = _ref2.count;
          countLike = count;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 18;
          _iterator2 = processPosts.Comments[Symbol.iterator]();

        case 20:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 28;
            break;
          }

          cmt = _step2.value;
          _context2.next = 24;
          return regeneratorRuntime.awrap(Comment.findAll({
            where: _defineProperty({}, Op.and, [{
              id_post: cmt.id_post
            }, {
              reply: cmt.id_com
            }])
          }).then(function (e) {
            return e.length;
          }));

        case 24:
          cmt.countRep = _context2.sent;

        case 25:
          _iteratorNormalCompletion2 = true;
          _context2.next = 20;
          break;

        case 28:
          _context2.next = 34;
          break;

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](18);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t0;

        case 34:
          _context2.prev = 34;
          _context2.prev = 35;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 37:
          _context2.prev = 37;

          if (!_didIteratorError2) {
            _context2.next = 40;
            break;
          }

          throw _iteratorError2;

        case 40:
          return _context2.finish(37);

        case 41:
          return _context2.finish(34);

        case 42:
          post = _objectSpread({}, processPosts, {
            isLike: isLike,
            countLike: countLike
          });
          res.status(200).json({
            success: true,
            post: post
          });

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[18, 30, 34, 42], [35,, 37, 41]]);
}; // Thêm bài viết


exports.createPost = function _callee3(req, res) {
  var newPost, i;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.create({
            content: req.body.content,
            id_user: req.user.id_user
          }));

        case 3:
          newPost = _context3.sent;
          i = 0;

        case 5:
          if (!(i < req.newFile.length)) {
            _context3.next = 11;
            break;
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(newPost.createPhoto({
            url: req.newFile[i],
            belong: "post"
          }));

        case 8:
          i++;
          _context3.next = 5;
          break;

        case 11:
          res.json({
            newPost: newPost,
            success: true
          });
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          res.sendStatus(500).send(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; // Cập nhật bài viết


exports.updatePost = function _callee4(req, res) {
  var updatedPost;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Post.update(req.body, {
            where: {
              id: req.params.id
            }
          }));

        case 3:
          updatedPost = _context4.sent;
          res.json({
            updatedPost: updatedPost,
            success: true
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.sendStatus(500).send(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Xóa bài viết


exports.deletePost = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Post.destroy({
            where: {
              id_post: req.params.id
            }
          }));

        case 3:
          res.json({
            success: true
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.sendStatus(500).send(_context5.t0);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; // Like bài


exports.likePost = function _callee6(req, res) {
  var id, userId, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          userId = req.user.id_user;
          _context6.next = 5;
          return regeneratorRuntime.awrap(Like_Post.findOne({
            where: {
              id_user: userId,
              id_post: id
            }
          }));

        case 5:
          result = _context6.sent;

          if (result) {
            _context6.next = 12;
            break;
          }

          _context6.next = 9;
          return regeneratorRuntime.awrap(Like_Post.create({
            id_user: userId,
            id_post: id
          }));

        case 9:
          res.status(200).json({
            like: true,
            msg: "Liked post: ".concat(id)
          });
          _context6.next = 15;
          break;

        case 12:
          _context6.next = 14;
          return regeneratorRuntime.awrap(Like_Post.destroy({
            where: {
              id_lp: result.id_lp
            }
          }));

        case 14:
          res.status(200).json({
            like: false,
            msg: "Disliked post: ".concat(id)
          });

        case 15:
          _context6.next = 20;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: {
              msg: "Lỗi chuyển đổi trạng thái"
            }
          });

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; // Lấy ra user like bài


exports.getUsersLP = function _callee7(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Like_Post.findAll({
            attributes: [],
            where: {
              id_post: req.params.id
            },
            include: {
              model: User,
              attributes: ["name", "image", "id_user"]
            }
          }));

        case 3:
          users = _context7.sent;
          res.json({
            users: users,
            success: true
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.sendStatus(500).send(err);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};