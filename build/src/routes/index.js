"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _musicController = _interopRequireDefault(require("../controllers/musicController"));
var router = _express["default"].Router();

// Hide router
// router.get("/spotify/authorization", spotifyController.saveToken);

// Main routers

// router.get("/", spotifyController.createSpotifyAuthorize);
// router.get("/top-playlists", spotifyController.getTopPlaylists);
// router.get("/playlist-tracks", spotifyController.getTrackByPlaylistId);
// router.get("/albums", spotifyController.getTopAlbums);
// router.get("/albums", spotifyController.getAlbums);
// router.get("/playlists", spotifyController.getPlaylists);
// router.get("/track", spotifyController.getTrack);

router.get("/playlists", _musicController["default"].getTopPlaylists);
var _default = router;
exports["default"] = _default;