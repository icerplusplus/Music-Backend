"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshTokenOnServer = exports.getTheLastTokenFromDb = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Token = _interopRequireDefault(require("../models/Token"));
var getTheLastTokenFromDb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var tokens;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _Token["default"].find().sort({
            _id: -1
          });
        case 2:
          tokens = _context.sent;
          return _context.abrupt("return", tokens[0]);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getTheLastTokenFromDb() {
    return _ref.apply(this, arguments);
  };
}();
exports.getTheLastTokenFromDb = getTheLastTokenFromDb;
var refreshTokenOnServer = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var lastedToken, upgradeToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getTheLastTokenFromDb();
        case 2:
          lastedToken = _context2.sent;
          console.log("lastedToken.id: ", lastedToken.id);
          _context2.next = 6;
          return _Token["default"].findByIdAndUpdate(lastedToken._id, {
            $set: {
              accessToken: token.access_token,
              refreshToken: token.refresh_token || null,
              expiresIn: token.expires_in,
              expiresAt: new Date().getTime() + parseInt(token.expires_in) * 1000
            }
          }, {
            "new": true
          });
        case 6:
          upgradeToken = _context2.sent;
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function refreshTokenOnServer(_x) {
    return _ref2.apply(this, arguments);
  };
}();
exports.refreshTokenOnServer = refreshTokenOnServer;