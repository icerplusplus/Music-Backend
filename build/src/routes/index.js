"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _musicController = _interopRequireDefault(require("../controllers/musicController"));
var router = _express["default"].Router();

// Main routers
router.get("/genres", _musicController["default"].getGenres);
router.get("/playlist/:playlistId", _musicController["default"].getPlaylist);
router.get("/track/:trackId", _musicController["default"].getTrack);
router.get("/top-tracks", _musicController["default"].getTopTrack);
router.get("/top-albums", _musicController["default"].getTopAlbums);
router.get("/top-artists", _musicController["default"].getTopArtists);
var _default = router;
exports["default"] = _default;