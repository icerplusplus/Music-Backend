"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.favoriteController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _FavoritePlaylists = _interopRequireDefault(require("../models/FavoritePlaylists"));
var favoriteController = {
  getFavoritePlaylistByUserId: function () {
    var _getFavoritePlaylistByUserId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var id, favorites;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.params.id;
            _context.next = 4;
            return _FavoritePlaylists["default"].findOne({
              userId: id
            });
          case 4:
            favorites = _context.sent;
            if (favorites) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", res.status(200).json({
              data: "",
              message: "No favorite list!",
              status: 404
            }));
          case 7:
            return _context.abrupt("return", res.status(200).json({
              data: favorites,
              message: "Get favorite successful!",
              status: 200
            }));
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(200).json({
              data: "",
              message: "Get favorite data failed!",
              status: 500
            }));
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 10]]);
    }));
    function getFavoritePlaylistByUserId(_x, _x2) {
      return _getFavoritePlaylistByUserId.apply(this, arguments);
    }
    return getFavoritePlaylistByUserId;
  }(),
  // TODO: create new favorite playlist with user id = 64213d45a4bff7483a2fad2f
  createNewFavoritePlaylist: function () {
    var _createNewFavoritePlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body, userId, favoriteNameExist, newFavoritePlaylist, newPlaylist;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.body.id;
            _context2.next = 4;
            return _FavoritePlaylists["default"].findOne({
              userId: req.body.id,
              title: req.body.title,
              thumbnail: (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.thumbnail
            });
          case 4:
            favoriteNameExist = _context2.sent;
            if (!favoriteNameExist) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(200).json({
              data: "",
              message: "Favorite title exist in system!",
              status: 403
            }));
          case 7:
            newFavoritePlaylist = new _FavoritePlaylists["default"]({
              userId: userId,
              title: req.body.title
            });
            _context2.next = 10;
            return newFavoritePlaylist.save();
          case 10:
            newPlaylist = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              data: newPlaylist,
              message: "Create new favorite playlist successful!",
              status: 200
            }));
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(200).json({
              data: "",
              message: "Create new favorite playlist data failed!",
              status: 500
            }));
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 14]]);
    }));
    function createNewFavoritePlaylist(_x3, _x4) {
      return _createNewFavoritePlaylist.apply(this, arguments);
    }
    return createNewFavoritePlaylist;
  }(),
  // TODO: add song to favorite playlist with favorite playlist id
  updateSongsToFavoritePlaylist: function () {
    var _updateSongsToFavoritePlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var favoriteId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            favoriteId = req.body.id;
            _FavoritePlaylists["default"].findByIdAndUpdate(favoriteId, {
              $set: {
                songs: req.body.songs
              }
            }, {
              "new": true
            }).then(function (playlist) {
              console.log("Songs is added");
              return res.status(200).json({
                data: playlist,
                message: "Add new songs to favorite playlist successful!",
                status: 200
              });
            });
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(200).json({
              data: "",
              message: "Add new songs to favorite playlist data failed!",
              status: 500
            }));
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }));
    function updateSongsToFavoritePlaylist(_x5, _x6) {
      return _updateSongsToFavoritePlaylist.apply(this, arguments);
    }
    return updateSongsToFavoritePlaylist;
  }()
};
exports.favoriteController = favoriteController;