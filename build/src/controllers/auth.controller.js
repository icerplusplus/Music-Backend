"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _libraries = require("../libraries");
var _constant = require("../utils/constant.js");
var _excluded = ["isAdmin", "password"],
  _excluded2 = ["password"],
  _excluded3 = ["password"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var refreshTokens = [];
var authController = {
  // REGISTER
  register: function () {
    var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, _req$body2, passwordHashed, userExist, newUser, user, _user$_doc, isAdmin, password, filterInfo;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _libraries.hashPassword)(req.body.password);
          case 3:
            passwordHashed = _context.sent;
            _context.next = 6;
            return _User["default"].findOne({
              email: req.body.email
            });
          case 6:
            userExist = _context.sent;
            if (!userExist) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", res.status(200).json({
              data: {},
              message: "Email already exists in system!"
            }));
          case 9:
            // Create new user
            newUser = new _User["default"]({
              name: req.body.name,
              email: req.body.email,
              password: passwordHashed,
              isAdmin: ((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.isAdmin) || false,
              avatar: ((_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.avatar) || _constant.defaultAvatar
            }); // Save to database after 5s
            _context.next = 12;
            return newUser.save();
          case 12:
            user = _context.sent;
            _user$_doc = user._doc, isAdmin = _user$_doc.isAdmin, password = _user$_doc.password, filterInfo = (0, _objectWithoutProperties2["default"])(_user$_doc, _excluded);
            return _context.abrupt("return", res.status(200).json({
              data: filterInfo,
              message: "create new account successful"
            }));
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(200).json(_context.t0));
          case 21:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 17]]);
    }));
    function register(_x, _x2) {
      return _register.apply(this, arguments);
    }
    return register;
  }(),
  // LOGIN
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var user, validPassword, accessToken, refreshToken, updatedUser, _updatedUser$_doc, password, orders;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            });
          case 3:
            user = _context3.sent;
            if (user) {
              _context3.next = 6;
              break;
            }
            return _context3.abrupt("return", res.status(200).json({
              data: {},
              message: "Wrong email!"
            }));
          case 6:
            _context3.next = 8;
            return _bcrypt["default"].compare(req.body.password, user.password);
          case 8:
            validPassword = _context3.sent;
            if (validPassword) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", res.status(200).json({
              data: {},
              message: "Wrong password!"
            }));
          case 11:
            if (!(user && validPassword)) {
              _context3.next = 23;
              break;
            }
            _context3.next = 14;
            return (0, _libraries.generateAccessToken)(user);
          case 14:
            accessToken = _context3.sent;
            _context3.next = 17;
            return (0, _libraries.generateRefreshToken)(user);
          case 17:
            refreshToken = _context3.sent;
            _context3.next = 20;
            return _User["default"].findByIdAndUpdate(user._id, {
              $set: {
                accessToken: accessToken,
                refreshToken: refreshToken
              }
            }, {
              "new": true
            }).then(function (user) {
              return user;
            });
          case 20:
            updatedUser = _context3.sent;
            _updatedUser$_doc = updatedUser._doc, password = _updatedUser$_doc.password, orders = (0, _objectWithoutProperties2["default"])(_updatedUser$_doc, _excluded2);
            setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", res.status(200).json({
                      data: _objectSpread({}, orders),
                      message: "Login successful!"
                    }));
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            })), 2000);
          case 23:
            _context3.next = 29;
            break;
          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](0);
            console.log("Login failed", _context3.t0);
            return _context3.abrupt("return", res.status(200).json(_context3.t0));
          case 29:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 25]]);
    }));
    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }
    return login;
  }(),
  // GET REFRESH TOKEN
  getRefreshToken: function () {
    var _getRefreshToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var refreshToken;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            refreshToken = req.headers.token.split(" ")[1];
            if (refreshToken) {
              _context5.next = 4;
              break;
            }
            return _context5.abrupt("return", res.status(200).json({
              data: {},
              message: "You're not authenticated"
            }));
          case 4:
            _jsonwebtoken["default"].verify(refreshToken, process.env.JWT_REFRESH_KEY, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err, user) {
                var newAccessToken, newRefreshToken, updatedUser, _updatedUser$_doc2, password, orders;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!err) {
                        _context4.next = 2;
                        break;
                      }
                      return _context4.abrupt("return", res.status(200).json({
                        data: {},
                        message: "Refresh Token is not valid"
                      }));
                    case 2:
                      _context4.next = 4;
                      return (0, _libraries.generateAccessToken)(user);
                    case 4:
                      newAccessToken = _context4.sent;
                      _context4.next = 7;
                      return (0, _libraries.generateRefreshToken)(user);
                    case 7:
                      newRefreshToken = _context4.sent;
                      _context4.next = 10;
                      return _User["default"].findByIdAndUpdate(user.id, {
                        $set: {
                          accessToken: newAccessToken,
                          refreshToken: newRefreshToken
                        }
                      }, {
                        "new": true
                      }).then(function (user) {
                        return user;
                      });
                    case 10:
                      updatedUser = _context4.sent;
                      // return access token to client
                      _updatedUser$_doc2 = updatedUser._doc, password = _updatedUser$_doc2.password, orders = (0, _objectWithoutProperties2["default"])(_updatedUser$_doc2, _excluded3);
                      return _context4.abrupt("return", res.status(200).json({
                        data: _objectSpread({}, orders),
                        message: "access token updated"
                      }));
                    case 13:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context5.next = 10;
            break;
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(200).json(_context5.t0));
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }));
    function getRefreshToken(_x5, _x6) {
      return _getRefreshToken.apply(this, arguments);
    }
    return getRefreshToken;
  }(),
  // LOGOUT
  logout: function () {
    var _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            // Clear refresh token from cookie
            // res.clearCookie("refreshToken");

            // delete refresh token in db
            _User["default"].findByIdAndUpdate(req.params.id, {
              $set: {
                accessToken: ""
              }
            }, {
              "new": true
            }).then(function (user) {
              console.log("token is updated");
            });
            return _context6.abrupt("return", res.status(200).json({
              data: {},
              message: "Logout successfully!"
            }));
          case 2:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function logout(_x9, _x10) {
      return _logout.apply(this, arguments);
    }
    return logout;
  }(),
  // LOGOUT
  changePassword: function () {
    var _changePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var passwordHashed;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _libraries.hashPassword)(req.body.password);
          case 3:
            passwordHashed = _context7.sent;
            // find user and update
            _User["default"].findByIdAndUpdate(req.params.id, {
              $set: {
                password: passwordHashed
              }
            }, {
              "new": true
            }).then(function (user) {
              console.log("Password is updated");
            });
            return _context7.abrupt("return", res.status(200).json({
              data: {},
              message: "Password is updated!"
            }));
          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(200).json({
              data: {},
              message: "The password change process has failed!"
            }));
          case 11:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 8]]);
    }));
    function changePassword(_x11, _x12) {
      return _changePassword.apply(this, arguments);
    }
    return changePassword;
  }()
};
exports.authController = authController;