"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _constant = require("./../libs/constant");
// get Genres
// 1 genre co nhieu playlist
// 1 playlist co nhieu track

var musicController = {
  getTopTrack: function () {
    var _getTopTrack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _yield$axios$get, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get("".concat(_constant.options.url, "/chart/tracks/top"), {
              headers: _constant.options.headers,
              params: {
                region: "VN"
              }
            });
          case 3:
            _yield$axios$get = _context.sent;
            data = _yield$axios$get.data;
            console.log(data);
            return _context.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log("Not fetch top track :))");
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0
            }));
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 9]]);
    }));
    function getTopTrack(_x, _x2) {
      return _getTopTrack.apply(this, arguments);
    }
    return getTopTrack;
  }(),
  getTopArtists: function () {
    var _getTopArtists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _yield$axios$get2, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios["default"].get("".concat(_constant.options.url, "/chart/artists/top"), {
              headers: _constant.options.headers,
              params: {
                region: "VN"
              }
            });
          case 3:
            _yield$axios$get2 = _context2.sent;
            data = _yield$axios$get2.data;
            console.log(data);
            res.status(200).json({
              data: data
            });
            _context2.next = 13;
            break;
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log("Not fetch top artists :))");
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0
            }));
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }));
    function getTopArtists(_x3, _x4) {
      return _getTopArtists.apply(this, arguments);
    }
    return getTopArtists;
  }(),
  getTopAlbums: function () {
    var _getTopAlbums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _yield$axios$get3, data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _axios["default"].get("".concat(_constant.options.url, "/chart/albums/top"), {
              headers: _constant.options.headers,
              params: {
                region: "VN"
              }
            });
          case 3:
            _yield$axios$get3 = _context3.sent;
            data = _yield$axios$get3.data;
            console.log(data);
            return _context3.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log("Not fetch top artists :))");
            return _context3.abrupt("return", res.status(500).json({
              error: _context3.t0
            }));
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 9]]);
    }));
    function getTopAlbums(_x5, _x6) {
      return _getTopAlbums.apply(this, arguments);
    }
    return getTopAlbums;
  }(),
  getGenres: function () {
    var _getGenres = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var _yield$axios$get4, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _axios["default"].get("".concat(_constant.options.url, "/home"), {
              headers: _constant.options.headers,
              params: {
                region: "VN"
              }
            });
          case 3:
            _yield$axios$get4 = _context4.sent;
            data = _yield$axios$get4.data;
            console.log(data);
            return _context4.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.log("Not fetch Genres");
            return _context4.abrupt("return", res.status(500).json({
              error: _context4.t0
            }));
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 9]]);
    }));
    function getGenres(_x7, _x8) {
      return _getGenres.apply(this, arguments);
    }
    return getGenres;
  }(),
  // get track list with playlist Id
  getPlaylist: function () {
    var _getPlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var playlistId, _yield$axios$get5, data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            playlistId = req.params.playlistId || "37i9dQZF1DWVbRrSFENdgA";
            _context5.prev = 1;
            _context5.next = 4;
            return _axios["default"].get("".concat(_constant.options.url, "/playlist/contents"), {
              headers: _constant.options.headers,
              params: {
                playlistId: playlistId
              }
            });
          case 4:
            _yield$axios$get5 = _context5.sent;
            data = _yield$axios$get5.data;
            console.log(data);
            return _context5.abrupt("return", res.status(200).json({
              data: data
            }));
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            console.log("Not fetch playlist with id: " + playlistId);
            return _context5.abrupt("return", res.status(500).json({
              error: _context5.t0
            }));
          case 14:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1, 10]]);
    }));
    function getPlaylist(_x9, _x10) {
      return _getPlaylist.apply(this, arguments);
    }
    return getPlaylist;
  }(),
  // find Track on SoundCloud
  // find by Track ID, track share URL, track name, ...
  getTrack: function () {
    var _getTrack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var trackId, _yield$axios$get6, data;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            trackId = req.params.trackId;
            _context6.prev = 1;
            _context6.next = 4;
            return _axios["default"].get("".concat(_constant.options.url, "/track/download/soundcloud"), {
              headers: _constant.options.headers,
              params: {
                track: trackId
              }
            });
          case 4:
            _yield$axios$get6 = _context6.sent;
            data = _yield$axios$get6.data;
            console.log(data);
            return _context6.abrupt("return", res.status(200).json({
              data: data
            }));
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](1);
            console.log("Not fetch track with id: " + trackId);
            return _context6.abrupt("return", res.status(500).json({
              error: _context6.t0
            }));
          case 14:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[1, 10]]);
    }));
    function getTrack(_x11, _x12) {
      return _getTrack.apply(this, arguments);
    }
    return getTrack;
  }()
};
var _default = musicController;
exports["default"] = _default;