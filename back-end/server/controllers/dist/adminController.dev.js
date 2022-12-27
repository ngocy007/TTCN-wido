"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../models"),
    User = _require.User,
    Follow = _require.Follow,
    Comment = _require.Comment,
    Post = _require.Post,
    Photo = _require.Photo;

var _require2 = require("sequelize"),
    Op = _require2.Op;

exports.statistic = function _callee(req, res) {
  var start, end, sum_user, sum_post, sum_comment, statistic;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          start = typeof req.body.start === "undefined" ? new Date(2001, 7, 11) : req.body.start;
          end = typeof req.body.end === "undefined" ? new Date() : req.body.end;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findAll({
            where: {
              createdAt: _defineProperty({}, Op.between, [start, end])
            }
          }).then(function (e) {
            return e.length;
          }));

        case 5:
          sum_user = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Post.findAll({
            where: {
              createdAt: _defineProperty({}, Op.between, [start, end])
            }
          }).then(function (e) {
            return e.length;
          }));

        case 8:
          sum_post = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Comment.findAll({
            where: {
              createdAt: _defineProperty({}, Op.between, [start, end])
            }
          }).then(function (e) {
            return e.length;
          }));

        case 11:
          sum_comment = _context.sent;
          statistic = {
            sum_user: sum_user,
            sum_post: sum_post,
            sum_comment: sum_comment,
            sum_mess: 0
          };
          res.status(200).json({
            statistic: statistic,
            success: true
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.grantPermission = function _callee2(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;

          if (!(id == req.user.id_user)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "khong duoc tu suong"
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              id_user: id
            }
          }));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "user not find"
          }));

        case 9:
          user.role = user.role == 2 ? 1 : 2;
          user.save();
          res.json({
            user: user,
            success: true
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.deleteUser = function _callee3(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          console.log(id);

          if (!(req.user.id_user == id)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "k duoc xoa ban than"
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              id_user: id
            }
          }));

        case 7:
          user = _context3.sent;

          if (user) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            success: false,
            message: "user not find"
          }));

        case 10:
          user.destroy();
          user.save();
          res.json({
            user: user,
            success: true
          });
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            message: _context3.t0.message
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
};