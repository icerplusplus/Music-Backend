"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.songController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _hashPassword = require("../libraries/hashPassword.js");
var _Song = _interopRequireDefault(require("../models/Song.js"));
var _constant = require("../utils/constant.js");
var songController = {
  // REGISTER
  all: function () {
    var _all = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var size, page, skipNumber, total, songs;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            size = Number(req.query.size);
            page = Number(req.query.page);
            skipNumber = size * (page - 1);
            _context.next = 6;
            return _Song["default"].find({});
          case 6:
            total = _context.sent;
            _context.next = 9;
            return _Song["default"].find({}).sort({
              createAt: -1
            }).skip(skipNumber).limit(size);
          case 9:
            songs = _context.sent;
            if (songs) {
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
              data: songs,
              total: total.length,
              page: page,
              status: 200,
              message: "Get songs data successful"
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
  // GET DETAIL SONGS
  getSongById: function () {
    var _getSongById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var song;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Song["default"].findOne({
              _id: req.params.id
            });
          case 3:
            song = _context2.sent;
            if (song) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No song found!"
            }));
          case 6:
            return _context2.abrupt("return", res.status(200).json({
              data: song,
              status: 200,
              message: "Get song data successful"
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
    function getSongById(_x3, _x4) {
      return _getSongById.apply(this, arguments);
    }
    return getSongById;
  }(),
  // UPDATE SONG INFO
  updateSongById: function () {
    var _updateSongById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var songId, song;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            songId = req.body.id;
            _context3.next = 4;
            return _Song["default"].findOne({
              _id: songId
            });
          case 4:
            song = _context3.sent;
            if (song) {
              _context3.next = 7;
              break;
            }
            return _context3.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No song found!"
            }));
          case 7:
            // find song and update
            _Song["default"].findByIdAndUpdate(songId, {
              $set: {
                title: req.body.title,
                alias: req.body.alias,
                artistsNames: req.body.artistsNames,
                duration: req.body.duration || song.duration,
                thumbnailM: req.body.thumbnailM || song.thumbnailM,
                audioUrl: req.body.audioUrl || song.audioUrl
              }
            }, {
              "new": true
            }).then(function (song) {
              return res.status(200).json({
                data: song,
                status: 200,
                message: "Song info is updated"
              });
            });
            _context3.next = 13;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(200).json({
              data: "",
              status: 500,
              message: _context3.t0
            }));
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 10]]);
    }));
    function updateSongById(_x5, _x6) {
      return _updateSongById.apply(this, arguments);
    }
    return updateSongById;
  }(),
  // DELETE SONG BY ID
  removeSongById: function () {
    var _removeSongById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var songId, song;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            songId = req.params.id;
            _context4.next = 4;
            return _Song["default"].findOne({
              _id: songId
            });
          case 4:
            song = _context4.sent;
            if (song) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", res.status(200).json({
              data: "",
              status: 404,
              message: "No song found!"
            }));
          case 7:
            _Song["default"].findByIdAndDelete({
              _id: songId
            }).then(function (data) {
              return res.status(200).json({
                data: "",
                status: 200,
                message: "Song data is removed"
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
    function removeSongById(_x7, _x8) {
      return _removeSongById.apply(this, arguments);
    }
    return removeSongById;
  }(),
  // CREATE SONG
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var newSong, rs;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            newSong = new _Song["default"]({
              encodeId: req.body.encodeId,
              title: req.body.title,
              alias: req.body.alias,
              artistsNames: req.body.artistsNames,
              duration: req.body.duration,
              thumbnailM: req.body.thumbnailM,
              audioUrl: req.body.audioUrl
            });
            rs = newSong.save();
            return _context5.abrupt("return", res.status(200).json({
              data: rs._doc,
              status: 200,
              message: "Create song successful!"
            }));
          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(200).json({
              data: "",
              status: 500,
              message: _context5.t0
            }));
          case 9:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 6]]);
    }));
    function create(_x9, _x10) {
      return _create.apply(this, arguments);
    }
    return create;
  }()
};
exports.songController = songController;