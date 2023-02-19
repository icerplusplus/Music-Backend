"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _musicController = _interopRequireDefault(require("../controllers/musicController"));
var _spotifyMiddleware = require("../middlewares/spotifyMiddleware");
var _spotifyController = require("./../controllers/spotifyController");
var router = _express["default"].Router();

// spotify routers
router.get("/", _spotifyController.spotifyController.spotifyAuthorize);
router.get("/callback", _spotifyController.spotifyController.spotifyCallback);
router.get("/top-albums", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getTopAlbums);
router.get("/top-artists", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getTopArtists);
router.get("/album-tracks/:albumId", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getAlbumTracks);
router.get("/top-tracks", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getTopTracks);
router.get("/featured-playlists", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getFeaturedPlaylists);
router.get("/genres", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getGenres);
router.get("/several-browse-categories", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getSeveralBrowseCategories);

// remove in feature
router.get("/single-browse-category/:categoryId", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getSingleBrowseCategory);
router.get("/category-playlists/:categoryId", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getCategoryPlaylists);
router.get("/playlist-tracks/:playlistId", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getPlaylistTracks);
router.get("/track/:trackId", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getTrackById);
router.get("/track-player/:name", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.playTrackWithUrl);
router.get("/current-devices", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getCurrentDevices);

// router.get("/callback", spotifyController.setToken);
// router.get("/top-playlists", spotifyController.getTopPlaylists);
// router.get("/playlist/:playlistId", spotifyController.getTrackByPlaylistId);
// router.get("/track/:trackId", spotifyController.getTrackDetail);

// Main routers
// router.get("/genres", musicController.getGenres);
// router.get("/playlist/:playlistId", musicController.getPlaylist);
// router.get("/track/:trackId", musicController.getTrack);
// router.get("/top-tracks", musicController.getTopTrack);
// router.get("/top-albums", musicController.getTopAlbums);
// router.get("/top-artists", musicController.getTopArtists);
var _default = router;
exports["default"] = _default;