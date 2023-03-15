"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _musicController = _interopRequireDefault(require("../controllers/musicController"));
var _zingmp3Controller = require("../controllers/zingmp3Controller");
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
router.post("/track-urls", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getTrackUrlByNames);

// artist
router.get("/artist/:id", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getArtistById);
router.get("/top-tracks-of-artist/:id", _spotifyMiddleware.spotifyMiddleware.spotifyAuth, _spotifyController.spotifyController.getTopTracksByArtistId);

// zing mp3 routers
// getSong
router.get("/song/:id", _zingmp3Controller.zingmp3Controller.getSong);

// getDetailPlaylist
router.get("/detailplaylist/:id", _zingmp3Controller.zingmp3Controller.getDetailPlaylist);

// getHome
router.get("/home", _zingmp3Controller.zingmp3Controller.getHome);

// getTop100
router.get("/top100", _zingmp3Controller.zingmp3Controller.getTop100);

// getTopArtists
router.get("/topartists", _zingmp3Controller.zingmp3Controller.getTopArtists);

// getChartHome
router.get("/charthome", _zingmp3Controller.zingmp3Controller.getChartHome);

// getNewReleaseChart
router.get("/newreleasechart", _zingmp3Controller.zingmp3Controller.getNewReleaseChart);

// getInfoSong
router.get("/infosong", _zingmp3Controller.zingmp3Controller.getInfo);

// getArtist
router.get("/artist", _zingmp3Controller.zingmp3Controller.getArtist);

// getArtistSong
router.get("/artistsong", _zingmp3Controller.zingmp3Controller.getArtistSong);

// getLyric
router.get("/lyric/:id", _zingmp3Controller.zingmp3Controller.getLyric);

// search
router.get("/search", _zingmp3Controller.zingmp3Controller.search);

// suggestions
router.get("/suggestions", _zingmp3Controller.zingmp3Controller.suggestions);

// getListMV
router.get("/listmv", _zingmp3Controller.zingmp3Controller.getListMV);

// getCategoryMV
router.get("/categorymv", _zingmp3Controller.zingmp3Controller.getCategoryMV);

// getVideo
router.get("/video", _zingmp3Controller.zingmp3Controller.getVideo);
var _default = router;
exports["default"] = _default;