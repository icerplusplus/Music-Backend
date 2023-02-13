"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _constant = require("./../libs/constant");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// get Genres
// 1 genre co nhieu playlist
// 1 playlist co nhieu track

var musicController = {
  getTopTrack: function () {
    var _getTopTrack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var newOptions, _yield$axios$request, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/chart/tracks/top",
              params: {
                region: "VN"
              }
            });
            _context.prev = 1;
            _context.next = 4;
            return _axios["default"].request(newOptions);
          case 4:
            _yield$axios$request = _context.sent;
            data = _yield$axios$request.data;
            return _context.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log("Not fetch track with id: " + trackId);
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0
            }));
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 9]]);
    }));
    function getTopTrack(_x, _x2) {
      return _getTopTrack.apply(this, arguments);
    }
    return getTopTrack;
  }(),
  getTopArtists: function () {
    var _getTopArtists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var newOptions, _yield$axios$request2, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/chart/artists/top",
              params: {
                region: "VN"
              }
            });
            _context2.prev = 1;
            _context2.next = 4;
            return _axios["default"].request(newOptions);
          case 4:
            _yield$axios$request2 = _context2.sent;
            data = _yield$axios$request2.data;
            return _context2.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log("Not fetch track with id: " + trackId);
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0
            }));
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 9]]);
    }));
    function getTopArtists(_x3, _x4) {
      return _getTopArtists.apply(this, arguments);
    }
    return getTopArtists;
  }(),
  getTopAlbums: function () {
    var _getTopAlbums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var newOptions, _yield$axios$request3, data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/chart/albums/top",
              params: {
                region: "VN"
              }
            });
            _context3.prev = 1;
            _context3.next = 4;
            return _axios["default"].request(newOptions);
          case 4:
            _yield$axios$request3 = _context3.sent;
            data = _yield$axios$request3.data;
            return _context3.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.log("Not fetch track with id: " + trackId);
            return _context3.abrupt("return", res.status(500).json({
              error: _context3.t0
            }));
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 9]]);
    }));
    function getTopAlbums(_x5, _x6) {
      return _getTopAlbums.apply(this, arguments);
    }
    return getTopAlbums;
  }(),
  getGenres: function () {
    var _getGenres = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var newOptions, _yield$axios$request4, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/home",
              params: {
                region: "VN"
              }
            });
            _context4.prev = 1;
            _context4.next = 4;
            return _axios["default"].request(newOptions);
          case 4:
            _yield$axios$request4 = _context4.sent;
            data = _yield$axios$request4.data;
            return _context4.abrupt("return", res.status(200).json({
              data: data
            }));
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            console.log("Not fetch track with id: " + trackId);
            return _context4.abrupt("return", res.status(500).json({
              error: _context4.t0
            }));
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[1, 9]]);
    }));
    function getGenres(_x7, _x8) {
      return _getGenres.apply(this, arguments);
    }
    return getGenres;
  }(),
  // get track list with playlist Id
  getPlaylist: function () {
    var _getPlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var playlistId, newOptions, _yield$axios$request5, data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            playlistId = req.params.playlistId || "37i9dQZF1DWVbRrSFENdgA";
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/playlist/contents",
              params: {
                playlistId: playlistId
              }
            });
            _context5.prev = 2;
            _context5.next = 5;
            return _axios["default"].request(newOptions);
          case 5:
            _yield$axios$request5 = _context5.sent;
            data = _yield$axios$request5.data;
            return _context5.abrupt("return", res.status(200).json({
              data: data
            }));
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](2);
            console.log("Not fetch track with id: " + trackId);
            return _context5.abrupt("return", res.status(500).json({
              error: _context5.t0
            }));
          case 14:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[2, 10]]);
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
      var trackId, newOptions, _yield$axios$request6, data;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            console.log("trackId: ", req.params.trackId);
            trackId = req.params.trackId;
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/track/download/soundcloud",
              params: {
                track: trackId
              }
            });
            _context6.prev = 3;
            _context6.next = 6;
            return _axios["default"].request(newOptions);
          case 6:
            _yield$axios$request6 = _context6.sent;
            data = _yield$axios$request6.data;
            return _context6.abrupt("return", res.status(200).json({
              data: data
            }));
          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](3);
            console.log("Not fetch track with id: " + trackId);
            return _context6.abrupt("return", res.status(500).json({
              error: _context6.t0
            }));
          case 15:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[3, 11]]);
    }));
    function getTrack(_x11, _x12) {
      return _getTrack.apply(this, arguments);
    }
    return getTrack;
  }()
};
var _default = musicController;
exports["default"] = _default;