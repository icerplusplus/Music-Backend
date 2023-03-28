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
var _excluded = ["isAdmin", "password"],
  _excluded2 = ["password"],
  _excluded3 = ["password"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var refreshTokens = [];
var authController = {
  // REGISTER
  register: function () {
    var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var passwordHashed, userExist, newUser, user, _user$_doc, isAdmin, password, filterInfo;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _libraries.hashPassword)(req.body.password);
          case 3:
            passwordHashed = _context2.sent;
            _context2.next = 6;
            return _User["default"].findOne({
              email: req.body.email
            });
          case 6:
            userExist = _context2.sent;
            if (!userExist) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", res.status(200).json({
              data: {},
              message: "Email already exists in system!"
            }));
          case 9:
            // Create new user
            newUser = new _User["default"]({
              name: req.body.name,
              email: req.body.email,
              password: passwordHashed
            }); // Save to database after 5s
            _context2.next = 12;
            return newUser.save();
          case 12:
            user = _context2.sent;
            _user$_doc = user._doc, isAdmin = _user$_doc.isAdmin, password = _user$_doc.password, filterInfo = (0, _objectWithoutProperties2["default"])(_user$_doc, _excluded);
            setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", res.status(200).json({
                      data: filterInfo,
                      message: "create new account successful"
                    }));
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            })), 5000);
            _context2.next = 21;
            break;
          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(200).json(_context2.t0));
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 17]]);
    }));
    function register(_x, _x2) {
      return _register.apply(this, arguments);
    }
    return register;
  }(),
  // LOGIN
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var user, validPassword, accessToken, refreshToken, updatedUser, _updatedUser$_doc, password, orders;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            });
          case 3:
            user = _context4.sent;
            if (user) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", res.status(200).json({
              data: {},
              message: "Wrong email!"
            }));
          case 6:
            _context4.next = 8;
            return _bcrypt["default"].compare(req.body.password, user.password);
          case 8:
            validPassword = _context4.sent;
            if (validPassword) {
              _context4.next = 11;
              break;
            }
            return _context4.abrupt("return", res.status(200).json({
              data: {},
              message: "Wrong password!"
            }));
          case 11:
            if (!(user && validPassword)) {
              _context4.next = 23;
              break;
            }
            _context4.next = 14;
            return (0, _libraries.generateAccessToken)(user);
          case 14:
            accessToken = _context4.sent;
            _context4.next = 17;
            return (0, _libraries.generateRefreshToken)(user);
          case 17:
            refreshToken = _context4.sent;
            _context4.next = 20;
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
            updatedUser = _context4.sent;
            _updatedUser$_doc = updatedUser._doc, password = _updatedUser$_doc.password, orders = (0, _objectWithoutProperties2["default"])(_updatedUser$_doc, _excluded2);
            setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", res.status(200).json({
                      data: _objectSpread({}, orders),
                      message: "Login successful!"
                    }));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            })), 2000);
          case 23:
            _context4.next = 29;
            break;
          case 25:
            _context4.prev = 25;
            _context4.t0 = _context4["catch"](0);
            console.log("Login failed", _context4.t0);
            return _context4.abrupt("return", res.status(200).json(_context4.t0));
          case 29:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 25]]);
    }));
    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }
    return login;
  }(),
  // GET REFRESH TOKEN
  getRefreshToken: function () {
    var _getRefreshToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var refreshToken;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            refreshToken = req.headers.token.split(" ")[1];
            if (refreshToken) {
              _context6.next = 4;
              break;
            }
            return _context6.abrupt("return", res.status(200).json({
              data: {},
              message: "You're not authenticated"
            }));
          case 4:
            _jsonwebtoken["default"].verify(refreshToken, process.env.JWT_REFRESH_KEY, /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, user) {
                var newAccessToken, newRefreshToken, updatedUser, _updatedUser$_doc2, password, orders;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!err) {
                        _context5.next = 2;
                        break;
                      }
                      return _context5.abrupt("return", res.status(200).json({
                        data: {},
                        message: "Refresh Token is not valid"
                      }));
                    case 2:
                      _context5.next = 4;
                      return (0, _libraries.generateAccessToken)(user);
                    case 4:
                      newAccessToken = _context5.sent;
                      _context5.next = 7;
                      return (0, _libraries.generateRefreshToken)(user);
                    case 7:
                      newRefreshToken = _context5.sent;
                      _context5.next = 10;
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
                      updatedUser = _context5.sent;
                      // return access token to client
                      _updatedUser$_doc2 = updatedUser._doc, password = _updatedUser$_doc2.password, orders = (0, _objectWithoutProperties2["default"])(_updatedUser$_doc2, _excluded3);
                      return _context5.abrupt("return", res.status(200).json({
                        data: _objectSpread({}, orders),
                        message: "access token updated"
                      }));
                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              return function (_x7, _x8) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context6.next = 10;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(200).json(_context6.t0));
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 7]]);
    }));
    function getRefreshToken(_x5, _x6) {
      return _getRefreshToken.apply(this, arguments);
    }
    return getRefreshToken;
  }(),
  // LOGOUT
  logout: function () {
    var _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
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
            return _context7.abrupt("return", res.status(200).json({
              data: {},
              message: "Logout successfully!"
            }));
          case 2:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function logout(_x9, _x10) {
      return _logout.apply(this, arguments);
    }
    return logout;
  }(),
  // LOGOUT
  changePassword: function () {
    var _changePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var passwordHashed;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _libraries.hashPassword)(req.body.password);
          case 3:
            passwordHashed = _context8.sent;
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
            return _context8.abrupt("return", res.status(200).json({
              data: {},
              message: "Password is updated!"
            }));
          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(200).json({
              data: {},
              message: "The password change process has failed!"
            }));
          case 11:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 8]]);
    }));
    function changePassword(_x11, _x12) {
      return _changePassword.apply(this, arguments);
    }
    return changePassword;
  }()
};
exports.authController = authController;