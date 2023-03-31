"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _hashPassword = require("../libraries/hashPassword.js");
var _User = _interopRequireDefault(require("../models/User.js"));
var userController = {
  // REGISTER
  all: function () {
    var _all = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var size, page, skipNumber, total, users;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            size = Number(req.query.size);
            page = Number(req.query.page);
            skipNumber = size * (page - 1);
            _context.next = 6;
            return _User["default"].find({});
          case 6:
            total = _context.sent;
            _context.next = 9;
            return _User["default"].find({}).skip(skipNumber).limit(size);
          case 9:
            users = _context.sent;
            if (users) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No user found!"
            }));
          case 12:
            return _context.abrupt("return", res.status(200).json({
              data: users,
              total: total.length,
              page: page,
              status: 200,
              message: "Get users data successful"
            }));
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(200).json({
              data: "",
              status: 500,
              message: _context.t0
            }));
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 15]]);
    }));
    function all(_x, _x2) {
      return _all.apply(this, arguments);
    }
    return all;
  }(),
  // GET DETAIL USER
  getUserById: function () {
    var _getUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var user;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findOne({
              _id: req.params.id
            });
          case 3:
            user = _context2.sent;
            if (user) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No user found!"
            }));
          case 6:
            return _context2.abrupt("return", res.status(200).json({
              data: user,
              status: 200,
              message: "Get user data successful"
            }));
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(200).json({
              data: "",
              status: 500,
              message: _context2.t0
            }));
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }));
    function getUserById(_x3, _x4) {
      return _getUserById.apply(this, arguments);
    }
    return getUserById;
  }(),
  // UPDATE USER INFO
  updateUserById: function () {
    var _updateUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var userId, userPassword, user, userInfo, passwordHashed;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.body.id;
            userPassword = req.body.password;
            _context3.next = 5;
            return _User["default"].findOne({
              _id: userId
            });
          case 5:
            user = _context3.sent;
            if (user) {
              _context3.next = 8;
              break;
            }
            return _context3.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No user found!"
            }));
          case 8:
            if (userPassword) {
              _context3.next = 12;
              break;
            }
            userInfo = {
              name: req.body.name,
              isAdmin: req.body.isAdmin,
              accessToken: "",
              refreshToken: ""
            };
            _context3.next = 16;
            break;
          case 12:
            _context3.next = 14;
            return (0, _hashPassword.hashPassword)(req.body.password);
          case 14:
            passwordHashed = _context3.sent;
            userInfo = {
              name: req.body.name,
              password: passwordHashed,
              isAdmin: req.body.isAdmin,
              accessToken: "",
              refreshToken: ""
            };
          case 16:
            if (userInfo) {
              // find user and update
              _User["default"].findByIdAndUpdate(userId, {
                $set: userInfo
              }, {
                "new": true
              }).then(function (user) {
                return res.status(200).json({
                  data: user,
                  status: 200,
                  message: "User info is updated"
                });
              });
            }
            _context3.next = 22;
            break;
          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(200).json({
              data: "",
              status: 500,
              message: _context3.t0
            }));
          case 22:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 19]]);
    }));
    function updateUserById(_x5, _x6) {
      return _updateUserById.apply(this, arguments);
    }
    return updateUserById;
  }(),
  // DELETE USER BY ID
  removeUserById: function () {
    var _removeUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var userId, user;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.params.id;
            _context4.next = 4;
            return _User["default"].findOne({
              _id: userId
            });
          case 4:
            user = _context4.sent;
            if (user) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No user found!"
            }));
          case 7:
            _User["default"].findByIdAndDelete({
              _id: userId
            }).then(function (data) {
              return res.status(200).json({
                data: "",
                status: 200,
                message: "User data is removed"
              });
            });
            _context4.next = 13;
            break;
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(200).json({
              data: "",
              status: 500,
              message: _context4.t0
            }));
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 10]]);
    }));
    function removeUserById(_x7, _x8) {
      return _removeUserById.apply(this, arguments);
    }
    return removeUserById;
  }()
};
exports.userController = userController;