"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = _interopRequireDefault(require("./../middlewares"));
var router = _express["default"].Router();

// auth routers
router.post("/register", _controllers.authController.register);
router.post("/login", _controllers.authController.login);
router.get("/refresh", _controllers.authController.getRefreshToken);
router.get("/logout/:id", _middlewares["default"].verifyToken, _controllers.authController.logout);
router.post("/changepassword/:id", _middlewares["default"].verifyToken, _controllers.authController.changePassword);

// zing mp3 routers
// getSong
router.get("/song/:id", _controllers.zingmp3Controller.getSong);

// getDetailPlaylist
router.get("/detailplaylist/:id", _controllers.zingmp3Controller.getDetailPlaylist);

// getHome
router.get("/home", _controllers.zingmp3Controller.getHome);

// getTop100
router.get("/top100", _controllers.zingmp3Controller.getTop100);

// getChartHome
router.get("/charthome", _controllers.zingmp3Controller.getChartHome);

// getNewReleaseChart
router.get("/newreleasechart", _controllers.zingmp3Controller.getNewReleaseChart);

// getInfoSong
router.get("/infosong", _controllers.zingmp3Controller.getInfo);

// getArtist
router.get("/artist", _controllers.zingmp3Controller.getArtist);

// getArtistSong
router.get("/artistsongs", _controllers.zingmp3Controller.getArtistSong);

// getArtistPlaylists
router.get("/artistplaylists", _controllers.zingmp3Controller.getArtistPlaylist);

// getLyric
router.get("/lyric/:id", _controllers.zingmp3Controller.getLyric);

// search
router.get("/search", _controllers.zingmp3Controller.search);

// suggestions
router.get("/suggestions", _controllers.zingmp3Controller.suggestions);

// getListMV
router.get("/listmv", _controllers.zingmp3Controller.getListMV);

// getCategoryMV
router.get("/categorymv", _controllers.zingmp3Controller.getCategoryMV);

// getVideo
router.get("/video", _controllers.zingmp3Controller.getVideo);

// Favorite playlist

router.get("/favorite/:id", _middlewares["default"].verifyToken, _controllers.favoriteController.getFavoritePlaylistByUserId);
router.post("/createnewfavoritelist", _middlewares["default"].verifyToken, _controllers.favoriteController.createNewFavoritePlaylist);
router.post("/addsongstofavoritelist", _middlewares["default"].verifyToken, _controllers.favoriteController.updateSongsToFavoritePlaylist);
var _default = router;
exports["default"] = _default;