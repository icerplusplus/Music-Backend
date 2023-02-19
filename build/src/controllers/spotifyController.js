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
var _ytdlCore = _interopRequireDefault(require("ytdl-core"));
var _ytdlCoreDiscord = _interopRequireDefault(require("ytdl-core-discord"));
var _ytSearch = _interopRequireDefault(require("yt-search"));
var spotifyController = {
  spotifyCallback: function () {
    var _spotifyCallback = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var code, _yield$spotifyApi$aut, body, accessToken, refreshToken;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            code = req.query.code;
            _context.next = 4;
            return _spotifyManager.spotifyApi.authorizationCodeGrant(code);
          case 4:
            _yield$spotifyApi$aut = _context.sent;
            body = _yield$spotifyApi$aut.body;
            accessToken = body.access_token;
            refreshToken = body.refresh_token; // Use the access token to make requests to the Spotify API
            _spotifyManager.spotifyApi.setAccessToken(accessToken);
            _spotifyManager.spotifyApi.setRefreshToken(refreshToken);
            (0, _tokenManager.refreshTokenOnServer)(body).then(function () {
              return console.log("token upgraded.");
            })["catch"](function (err) {
              return console.log(err);
            });
            res.send({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            _context.next = 17;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log("Spotify callback failed", _context.t0);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }));
    function spotifyCallback(_x, _x2) {
      return _spotifyCallback.apply(this, arguments);
    }
    return spotifyCallback;
  }(),
  spotifyAuthorize: function () {
    var _spotifyAuthorize = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var state, authorizeUrl;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            state = Math.random().toString(36).substring(7);
            authorizeUrl = _spotifyManager.spotifyApi.createAuthorizeURL(_constant.spotifyScopes, state, true);
            res.redirect(authorizeUrl);

            // const response = await getToken();
            // return res.status(200).json({
            //   data: {
            //     token: {
            //       access_token: response.access_token,
            //       expiresIn: response.expires_in,
            //       expiresAt:
            //         new Date().getTime() + parseInt(response?.expires_in) * 1000,
            //     },
            //   },
            // });
            _context2.next = 9;
            break;
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(404).json({
              message: _context2.t0
            }));
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 6]]);
    }));
    function spotifyAuthorize(_x3, _x4) {
      return _spotifyAuthorize.apply(this, arguments);
    }
    return spotifyAuthorize;
  }(),
  getTopAlbums: function () {
    var _getTopAlbums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context3.sent;
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
            _context3.next = 10;
            break;
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(404).json({
              message: _context3.t0
            }));
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 7]]);
    }));
    function getTopAlbums(_x5, _x6) {
      return _getTopAlbums.apply(this, arguments);
    }
    return getTopAlbums;
  }(),
  getTopArtists: function () {
    var _getTopArtists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context4.sent;
            _axios["default"].get("https://api.spotify.com/v1/search", {
              params: {
                type: "artist",
                q: 'genre:"vietnamese"',
                market: "VN",
                limit: 10
              },
              headers: {
                Authorization: "Bearer ".concat(lastedToken.accessToken)
              }
            }).then(function (response) {
              return res.status(200).json({
                data: response.data
              });
            })["catch"](function (error) {
              return res.status(404).json({
                message: error
              });
            });
            _context4.next = 10;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(404).json({
              message: _context4.t0
            }));
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 7]]);
    }));
    function getTopArtists(_x7, _x8) {
      return _getTopArtists.apply(this, arguments);
    }
    return getTopArtists;
  }(),
  getAlbumTracks: function () {
    var _getAlbumTracks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var albumId, limit, lastedToken;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            albumId = req.params.albumId;
            console.log("albumId: ", albumId);
            limit = 10;
            _context5.next = 6;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 6:
            lastedToken = _context5.sent;
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
            _context5.next = 13;
            break;
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(404).json({
              message: _context5.t0
            }));
          case 13:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 10]]);
    }));
    function getAlbumTracks(_x9, _x10) {
      return _getAlbumTracks.apply(this, arguments);
    }
    return getAlbumTracks;
  }(),
  getTopTracks: function () {
    var _getTopTracks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var playlistId, limit, lastedToken;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            // tracks Hot In Vn
            playlistId = "37i9dQZEVXbLdGSmz6xilI";
            limit = 10;
            _context6.next = 5;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 5:
            lastedToken = _context6.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/playlists/").concat(playlistId, "/tracks"), {
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
            _context6.next = 12;
            break;
          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(404).json({
              message: _context6.t0
            }));
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 9]]);
    }));
    function getTopTracks(_x11, _x12) {
      return _getTopTracks.apply(this, arguments);
    }
    return getTopTracks;
  }(),
  getFeaturedPlaylists: function () {
    var _getFeaturedPlaylists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var limit, offset, lastedToken;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            console.log(req.query.limit);
            limit = req.query.limit || 20;
            offset = 0;
            _context7.next = 6;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 6:
            lastedToken = _context7.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/browse/featured-playlists"), {
              headers: {
                Authorization: "Bearer " + lastedToken.accessToken
              },
              params: {
                limit: limit,
                offset: offset,
                country: "VN"
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
            _context7.next = 13;
            break;
          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(404).json({
              message: _context7.t0
            }));
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 10]]);
    }));
    function getFeaturedPlaylists(_x13, _x14) {
      return _getFeaturedPlaylists.apply(this, arguments);
    }
    return getFeaturedPlaylists;
  }(),
  getGenres: function () {
    var _getGenres = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context8.sent;
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
            _context8.next = 10;
            break;
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(404).json({
              message: _context8.t0
            }));
          case 10:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 7]]);
    }));
    function getGenres(_x15, _x16) {
      return _getGenres.apply(this, arguments);
    }
    return getGenres;
  }(),
  getSeveralBrowseCategories: function () {
    var _getSeveralBrowseCategories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context9.sent;
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
            _context9.next = 10;
            break;
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.status(404).json({
              message: _context9.t0
            }));
          case 10:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 7]]);
    }));
    function getSeveralBrowseCategories(_x17, _x18) {
      return _getSeveralBrowseCategories.apply(this, arguments);
    }
    return getSeveralBrowseCategories;
  }(),
  getSingleBrowseCategory: function () {
    var _getSingleBrowseCategory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var categoryId, lastedToken;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            categoryId = req.params.categoryId;
            _context10.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context10.sent;
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
            _context10.next = 11;
            break;
          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            return _context10.abrupt("return", res.status(404).json({
              message: _context10.t0
            }));
          case 11:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 8]]);
    }));
    function getSingleBrowseCategory(_x19, _x20) {
      return _getSingleBrowseCategory.apply(this, arguments);
    }
    return getSingleBrowseCategory;
  }(),
  getCategoryPlaylists: function () {
    var _getCategoryPlaylists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var categoryId, lastedToken;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            categoryId = req.params.categoryId;
            _context11.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context11.sent;
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
            _context11.next = 11;
            break;
          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](0);
            return _context11.abrupt("return", res.status(404).json({
              message: _context11.t0
            }));
          case 11:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 8]]);
    }));
    function getCategoryPlaylists(_x21, _x22) {
      return _getCategoryPlaylists.apply(this, arguments);
    }
    return getCategoryPlaylists;
  }(),
  getPlaylistTracks: function () {
    var _getPlaylistTracks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      var playlistId, limit, lastedToken;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            playlistId = req.params.playlistId;
            limit = 10;
            _context12.next = 5;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 5:
            lastedToken = _context12.sent;
            // console.log("lastedToken: ", timeCurrent, expiresAt);

            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/playlists/").concat(playlistId, "/tracks"), {
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
            _context12.next = 12;
            break;
          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](0);
            return _context12.abrupt("return", res.status(404).json({
              message: _context12.t0
            }));
          case 12:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 9]]);
    }));
    function getPlaylistTracks(_x23, _x24) {
      return _getPlaylistTracks.apply(this, arguments);
    }
    return getPlaylistTracks;
  }(),
  getTrackById: function () {
    var _getTrackById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      var trackId, lastedToken;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            trackId = req.params.trackId;
            _context13.next = 4;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 4:
            lastedToken = _context13.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/tracks/").concat(trackId), {
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
            _context13.next = 11;
            break;
          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13["catch"](0);
            return _context13.abrupt("return", res.status(404).json({
              message: _context13.t0
            }));
          case 11:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 8]]);
    }));
    function getTrackById(_x25, _x26) {
      return _getTrackById.apply(this, arguments);
    }
    return getTrackById;
  }(),
  getCurrentDevices: function () {
    var _getCurrentDevices = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
      var lastedToken;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return (0, _tokenManager.getTheLastTokenFromDb)();
          case 3:
            lastedToken = _context14.sent;
            _axios["default"].get("".concat(process.env.SPOTIFY_API_BASE_URL, "/me/player/devices"), {
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
            _context14.next = 10;
            break;
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            return _context14.abrupt("return", res.status(404).json({
              message: _context14.t0
            }));
          case 10:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 7]]);
    }));
    function getCurrentDevices(_x27, _x28) {
      return _getCurrentDevices.apply(this, arguments);
    }
    return getCurrentDevices;
  }(),
  playTrackWithUrl: function () {
    var _playTrackWithUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
      var name;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            name = req.params.name;
            (0, _ytSearch["default"])(name, /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(err, result) {
                var video, videoInfo, audioFormats;
                return _regenerator["default"].wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      if (!err) {
                        _context15.next = 5;
                        break;
                      }
                      console.error(err);
                      res.status(500).send("Error searching YouTube");
                      _context15.next = 11;
                      break;
                    case 5:
                      video = result.videos[0];
                      _context15.next = 8;
                      return _ytdlCore["default"].getInfo(video.videoId);
                    case 8:
                      videoInfo = _context15.sent;
                      audioFormats = _ytdlCoreDiscord["default"].filterFormats(videoInfo.formats, "audioonly");
                      return _context15.abrupt("return", res.status(200).json({
                        data: {
                          audioUrl: audioFormats[0].url
                        }
                      }));
                    case 11:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15);
              }));
              return function (_x31, _x32) {
                return _ref.apply(this, arguments);
              };
            }());
            _context16.next = 8;
            break;
          case 5:
            _context16.prev = 5;
            _context16.t0 = _context16["catch"](0);
            return _context16.abrupt("return", res.status(404).json({
              message: _context16.t0
            }));
          case 8:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 5]]);
    }));
    function playTrackWithUrl(_x29, _x30) {
      return _playTrackWithUrl.apply(this, arguments);
    }
    return playTrackWithUrl;
  }()
};
exports.spotifyController = spotifyController;