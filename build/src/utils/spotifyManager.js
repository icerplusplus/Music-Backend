"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spotifyApi = exports.getTopAlbums = exports.getToken = exports.basic = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
require("dotenv/config");
var _spotifyWebApiNode = _interopRequireDefault(require("spotify-web-api-node"));
var spotifyApi = new _spotifyWebApiNode["default"]({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:8617/api/callback"
});

// Endpoint to get a user's profile information
exports.spotifyApi = spotifyApi;
var basic = Buffer.from("".concat(process.env.SPOTIFY_CLIENT_ID, ":").concat(process.env.SPOTIFY_CLIENT_SECRET)).toString("base64");
exports.basic = basic;
var getToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _axios["default"])({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            headers: {
              Authorization: "Basic ".concat(basic),
              "Content-Type": "application/x-www-form-urlencoded"
            },
            params: {
              grant_type: "client_credentials"
            }
          });
        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getToken() {
    return _ref.apply(this, arguments);
  };
}();
exports.getToken = getToken;
var getTopAlbums = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken) {
    var _yield$axios$get, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("getTopAlbums: ", accessToken);
          _context2.next = 3;
          return _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/browse/new-releases?country=VN&limit=10"), {
            headers: {
              Authorization: "Bearer ".concat(accessToken)
            }
          });
        case 3:
          _yield$axios$get = _context2.sent;
          data = _yield$axios$get.data;
          if (!data) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", data.albums.items);
        case 7:
          return _context2.abrupt("return", null);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getTopAlbums(_x) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getTopAlbums = getTopAlbums;