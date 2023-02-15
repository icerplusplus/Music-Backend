"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spotifyController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
require("dotenv/config");
var _constant = require("../utils/constant");
var _spotifyManager = require("../utils/spotifyManager");
var _tokenManager = require("../utils/tokenManager");
var spotifyController = {
  spotifyAuthorize: function () {
    var _spotifyAuthorize = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _spotifyManager.getToken)();
          case 3:
            response = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              data: {
                token: {
                  access_token: response.access_token,
                  expiresIn: response.expires_in,
                  expiresAt: new Date().getTime() + parseInt(response === null || response === void 0 ? void 0 : response.expires_in) * 1000
                }
              }
            }));
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(404).json({
              message: _context.t0
            }));
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    function spotifyAuthorize(_x, _x2) {
      return _spotifyAuthorize.apply(this, arguments);
    }
    return spotifyAuthorize;
  }(),
  getTopAlbums: function () {
    var _getTopAlbums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context2.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/browse/new-releases?limit=10"), {
              headers: {
                Authorization: "Bearer ".concat(lastedToken.accessToken)
              },
              params: {
                market: "VN"
              }
            }).then(function (response) {
              return res.status(200).json({
                data: response.data
              });
            });
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(404).json({
              message: _context2.t0
            }));
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    function getTopAlbums(_x3, _x4) {
      return _getTopAlbums.apply(this, arguments);
    }
    return getTopAlbums;
  }(),
  getAlbumTracks: function () {
    var _getAlbumTracks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var albumId, limit, lastedToken;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            albumId = req.params.albumId;
            limit = 10;
            _context3.next = 5;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 5:
            lastedToken = _context3.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/albums/").concat(albumId, "/tracks"), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              },
              params: {
                limit: limit
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context3.next = 12;
            break;
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(404).json({
              message: _context3.t0
            }));
          case 12:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 9]]);
    }));
    function getAlbumTracks(_x5, _x6) {
      return _getAlbumTracks.apply(this, arguments);
    }
    return getAlbumTracks;
  }(),
  getTopTracks: function () {
    var _getTopTracks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var limit, lastedToken;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            limit = 10;
            _context4.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context4.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/audio-features"), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              },
              params: {
                limit: limit,
                offset: 0,
                // time_range: "short_term",
                market: "VN"
              }
            }).then(function (response) {
              // handle response data
              console.log(response.data);
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context4.next = 11;
            break;
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(404).json({
              message: _context4.t0
            }));
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 8]]);
    }));
    function getTopTracks(_x7, _x8) {
      return _getTopTracks.apply(this, arguments);
    }
    return getTopTracks;
  }(),
  getGenres: function () {
    var _getGenres = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context5.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/recommendations/available-genre-seeds"), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context5.next = 10;
            break;
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(404).json({
              message: _context5.t0
            }));
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }));
    function getGenres(_x9, _x10) {
      return _getGenres.apply(this, arguments);
    }
    return getGenres;
  }(),
  getSeveralBrowseCategories: function () {
    var _getSeveralBrowseCategories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context6.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/browse/categories"), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              },
              params: {
                limit: 10,
                market: "VN"
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context6.next = 10;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(404).json({
              message: _context6.t0
            }));
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 7]]);
    }));
    function getSeveralBrowseCategories(_x11, _x12) {
      return _getSeveralBrowseCategories.apply(this, arguments);
    }
    return getSeveralBrowseCategories;
  }(),
  getSingleBrowseCategory: function () {
    var _getSingleBrowseCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var categoryId, lastedToken;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            categoryId = req.params.categoryId;
            _context7.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context7.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/browse/categories/").concat(categoryId), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              },
              params: {
                market: "VN"
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context7.next = 11;
            break;
          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(404).json({
              message: _context7.t0
            }));
          case 11:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 8]]);
    }));
    function getSingleBrowseCategory(_x13, _x14) {
      return _getSingleBrowseCategory.apply(this, arguments);
    }
    return getSingleBrowseCategory;
  }(),
  getCategoryPlaylists: function () {
    var _getCategoryPlaylists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var categoryId, lastedToken;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            categoryId = req.params.categoryId;
            _context8.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context8.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/browse/categories/").concat(categoryId, "/playlists"), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              },
              params: {
                limit: 10,
                market: "VN"
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context8.next = 11;
            break;
          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(404).json({
              message: _context8.t0
            }));
          case 11:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 8]]);
    }));
    function getCategoryPlaylists(_x15, _x16) {
      return _getCategoryPlaylists.apply(this, arguments);
    }
    return getCategoryPlaylists;
  }(),
  getPlaylistTracks: function () {
    var _getPlaylistTracks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var playlistId, lastedToken;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            playlistId = req.params.playlistId;
            _context9.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context9.sent;
            console.log("lastedToken: ", timeCurrent, expiresAt);
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/playlists/").concat(playlistId), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context9.next = 12;
            break;
          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.status(404).json({
              message: _context9.t0
            }));
          case 12:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 9]]);
    }));
    function getPlaylistTracks(_x17, _x18) {
      return _getPlaylistTracks.apply(this, arguments);
    }
    return getPlaylistTracks;
  }(),
  getTrackById: function () {
    var _getTrackById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var trackId, lastedToken;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            trackId = req.params.trackId;
            _context10.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context10.sent;
            console.log("lastedToken: ", lastedToken);
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/tracks/").concat(trackId), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              }
            }).then(function (response) {
              // handle response data
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              // handle error
              return res.status(404).json({
                message: error
              });
            });
            _context10.next = 12;
            break;
          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](0);
            return _context10.abrupt("return", res.status(404).json({
              message: _context10.t0
            }));
          case 12:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 9]]);
    }));
    function getTrackById(_x19, _x20) {
      return _getTrackById.apply(this, arguments);
    }
    return getTrackById;
  }()
};
// react-native-spotify-remote
exports.spotifyController = spotifyController;