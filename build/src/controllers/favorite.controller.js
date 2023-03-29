"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.favoriteController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
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
            return _FavoritePlaylists["default"].find({
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
  // TODO: update favorite list
  updateFavoritePlaylist: function () {
    var _updateFavoritePlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var userId, favoriteIdList, favoriteListExist, updatedList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.body.id;
            favoriteIdList = req.body.favoriteIdList;
            _context4.next = 5;
            return _FavoritePlaylists["default"].find({
              userId: userId
            });
          case 5:
            favoriteListExist = _context4.sent;
            favoriteIdList.length > 0 && favoriteIdList.map( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      if (favoriteListExist.includes(id)) {
                        _context3.next = 3;
                        break;
                      }
                      _context3.next = 3;
                      return _FavoritePlaylists["default"].findByIdAndDelete(id);
                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x7) {
                return _ref.apply(this, arguments);
              };
            }());
            _context4.next = 9;
            return _FavoritePlaylists["default"].find({
              userId: userId
            });
          case 9:
            updatedList = _context4.sent;
            if (!(updatedList.length === 0)) {
              _context4.next = 12;
              break;
            }
            return _context4.abrupt("return", res.status(200).json({
              data: "",
              message: "No favorite playlist!",
              status: 404
            }));
          case 12:
            return _context4.abrupt("return", res.status(200).json({
              data: updatedList,
              message: "Update favorite playlist successful!",
              status: 200
            }));
          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(200).json({
              data: "",
              message: "Update favorite playlist data failed!",
              status: 500
            }));
          case 18:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 15]]);
    }));
    function updateFavoritePlaylist(_x5, _x6) {
      return _updateFavoritePlaylist.apply(this, arguments);
    }
    return updateFavoritePlaylist;
  }(),
  // TODO: add song to favorite playlist with favorite playlist id
  updateSongsToFavoritePlaylist: function () {
    var _updateSongsToFavoritePlaylist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var favoriteId, playlistTmp, favoriteExist, _favoriteExist$songs, playlist;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            favoriteId = req.body.id;
            playlistTmp = [];
            _context5.next = 5;
            return _FavoritePlaylists["default"].findOne({
              _id: favoriteId
            });
          case 5:
            favoriteExist = _context5.sent;
            if (favoriteExist) {
              (_favoriteExist$songs = favoriteExist.songs).push.apply(_favoriteExist$songs, (0, _toConsumableArray2["default"])(req.body.songs));
              playlistTmp = favoriteExist.songs;
            } else {
              playlistTmp = req.body.songs;
            }
            _context5.next = 9;
            return _FavoritePlaylists["default"].findByIdAndUpdate(favoriteId, {
              $set: {
                songs: playlistTmp
              }
            }, {
              "new": true
            });
          case 9:
            playlist = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              data: playlist,
              message: "Add new songs to favorite playlist successful!",
              status: 200
            }));
          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(200).json({
              data: "",
              message: "Add new songs to favorite playlist data failed!",
              status: 500
            }));
          case 16:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 13]]);
    }));
    function updateSongsToFavoritePlaylist(_x8, _x9) {
      return _updateSongsToFavoritePlaylist.apply(this, arguments);
    }
    return updateSongsToFavoritePlaylist;
  }()
};
exports.favoriteController = favoriteController;