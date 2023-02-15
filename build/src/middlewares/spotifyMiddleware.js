"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spotifyMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _Token = _interopRequireDefault(require("../models/Token"));
var _spotifyManager = require("../utils/spotifyManager");
var _tokenManager = require("../utils/tokenManager");
var spotifyMiddleware = {
  spotifyAuth: function () {
    var _spotifyAuth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var timeCurrent, token, expiresAt, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            timeCurrent = new Date().getTime();
            _context.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            token = _context.sent;
            expiresAt = parseInt(token === null || token === void 0 ? void 0 : token.expiresAt); // console.log("timeCurrent: ", timeCurrent, expiresAt);
            if (!(timeCurrent >= expiresAt - 300000)) {
              _context.next = 10;
              break;
            }
            _context.next = 8;
            return (0, _spotifyManager.getToken)();
          case 8:
            response = _context.sent;
            (0, _tokenManager.refreshTokenOnServer)(response).then(function () {
              next();
            })["catch"](function (err) {
              console.log("not refresh token in spotifyMiddleware");
            });
          case 10:
            next();
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function spotifyAuth(_x, _x2, _x3) {
      return _spotifyAuth.apply(this, arguments);
    }
    return spotifyAuth;
  }()
};
exports.spotifyMiddleware = spotifyMiddleware;