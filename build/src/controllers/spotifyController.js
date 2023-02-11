"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spotifyController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("dotenv/config");
var spotifyController = {
  // get the top 10 playlists in Vietnam
  getTopPlaylists: function () {
    var _getTopPlaylists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, limit, location;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, limit = _req$body.limit, location = _req$body.location;
            _context.prev = 1;
            return _context.abrupt("return", res.status(200).json({
              data: data
            }));
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(500).json({
              data: {},
              errors: {
                message: "Playlist not found."
              }
            }));
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 5]]);
    }));
    function getTopPlaylists(_x, _x2) {
      return _getTopPlaylists.apply(this, arguments);
    }
    return getTopPlaylists;
  }(),
  // get tracks from playlist id
  getTrackByPlaylistId: function () {
    var _getTrackByPlaylistId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var playlistId, _data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            playlistId = req.body.playlistId;
            _context2.prev = 1;
            _context2.next = 4;
            return spotifyApi.getPlaylistTracks(playlistId || "37i9dQZF1DWVOaOWiVD1Lf");
          case 4:
            _data = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              data: _data.body.items
            }));
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(500).json({
              data: {},
              errors: {
                message: "Playlist not found."
              }
            }));
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 8]]);
    }));
    function getTrackByPlaylistId(_x3, _x4) {
      return _getTrackByPlaylistId.apply(this, arguments);
    }
    return getTrackByPlaylistId;
  }(),
  // get the top 10 artists in Vietnam
  getAlbumsByArtist: function () {
    var _getAlbumsByArtist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var artistId, _data2;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            artistId = req.body.artistId;
            _context3.prev = 1;
            _context3.next = 4;
            return spotifyApi.getArtistAlbums(artistId);
          case 4:
            _data2 = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              data: _data2.body.items
            }));
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(500).json({
              data: {},
              errors: {
                message: "artist'id not found."
              }
            }));
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 8]]);
    }));
    function getAlbumsByArtist(_x5, _x6) {
      return _getAlbumsByArtist.apply(this, arguments);
    }
    return getAlbumsByArtist;
  }(),
  getTrackByTrackName: function () {
    var _getTrackByTrackName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var trackName, tracks;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            trackName = req.body.trackName;
            _context4.prev = 1;
            _context4.next = 4;
            return spotifyApi.searchTracks("".concat(trackName));
          case 4:
            tracks = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              data: tracks
            }));
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(500).json({
              data: {},
              errors: {
                message: "Track name not found."
              }
            }));
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[1, 8]]);
    }));
    function getTrackByTrackName(_x7, _x8) {
      return _getTrackByTrackName.apply(this, arguments);
    }
    return getTrackByTrackName;
  }(),
  // GET SONG DETAIL BY SONG ID
  getSongDetail: function () {
    var _getSongDetail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var trackId, result;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            trackId = res.body.trackId;
            _context5.prev = 1;
            _context5.next = 4;
            return spotifyApi.getTrack(trackId);
          case 4:
            result = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              data: result.body
            }));
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
            return _context5.abrupt("return", res.status(500).json({
              data: {},
              errors: {
                message: "Track's id not found."
              }
            }));
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1, 8]]);
    }));
    function getSongDetail(_x9, _x10) {
      return _getSongDetail.apply(this, arguments);
    }
    return getSongDetail;
  }()
};

//https://github.com/lethanhvietctt5/react-spotify
//  getAlbumTracks
// PORT=8008
// SPOTIFY_CLIENT_ID=6d6d1aafeb92496fa2cb7c63d95c1494
// SPOTIFY_CLIENT_SECRET=4a2c1906b6a546f9a141214d3eade304
// MONGO_URI=mongodb+srv://cmusicdatabase:cmusicdatabase@cluster0.fsdgjel.mongodb.net/?retryWrites=true&w=majority

// getAlbums: async (req, res) => {
//   // const albums = await spotifyApi.getAlbums();

//   const albums = await spotifyApi.getFeaturedPlaylists({
//     limit: 10,
//     offset: 0,
//     country: "VN",
//     locale: "sv_VN",
//   });

//   return res.status(200).json({ data: albums });
// },
// getPlaylists: async (req, res) => {
//   const playLists = await spotifyApi.getPlaylist(["37i9dQZF1DX1vC8WamgJcA"]);
//   return res.status(200).json({ data: playLists });
// },
// // get track detail
exports.spotifyController = spotifyController;