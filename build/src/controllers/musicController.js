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
var _data = require("./../api/data");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// get Genres
// 1 genre co nhieu playlist
// 1 playlist co nhieu track

var musicController = {
  getGenres: function () {
    var _getGenres = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var newOptions;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/home",
              params: {
                region: "VN"
              }
            }); // const { data } = await axios.request(newOptions);
            return _context.abrupt("return", res.status(200).json({
              data: _data.data.genres
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getGenres(_x, _x2) {
      return _getGenres.apply(this, arguments);
    }
    return getGenres;
  }(),
  // get track list with playlist Id
  getPlaylist: function () {
    var _getPlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var playlistId, newOptions;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            playlistId = req.params.playlistId || "37i9dQZF1DWVbRrSFENdgA";
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/playlist/contents",
              params: {
                playlistId: playlistId
              }
            }); // const { data } = await axios.request(newOptions);
            return _context2.abrupt("return", res.status(200).json({
              data: _data.data.playlistTracks
            }));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getPlaylist(_x3, _x4) {
      return _getPlaylist.apply(this, arguments);
    }
    return getPlaylist;
  }(),
  // find Track on SoundCloud
  // find by Track ID, track share URL, track name, ...
  getTrack: function () {
    var _getTrack = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var trackId, newOptions;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            trackId = req.params.trackId || "4CUvVaAYuXtvYURLFz7EIL";
            newOptions = _objectSpread(_objectSpread({}, _constant.options), {}, {
              url: _constant.options.url + "/track/download/soundcloud",
              params: {
                track: trackId
              }
            }); // const { data } = await axios.request(newOptions);
            return _context3.abrupt("return", res.status(200).json({
              data: _data.data.track
            }));
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function getTrack(_x5, _x6) {
      return _getTrack.apply(this, arguments);
    }
    return getTrack;
  }()
};
var _default = musicController;
exports["default"] = _default;