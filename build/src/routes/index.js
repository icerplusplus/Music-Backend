"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../controllers/auth.controller"));
var _zingmp = require("../controllers/zingmp3.controller");
var _middlewares = _interopRequireDefault(require("./../middlewares"));
var router = _express["default"].Router();

// auth routers
router.post("/register", _auth["default"].register);
router.post("/login", _auth["default"].login);
router.get("/refresh", _auth["default"].getRefreshToken);
router.get("/logout/:id", _middlewares["default"].verifyToken, _auth["default"].logout);

// zing mp3 routers
// getSong
router.get("/song/:id", _zingmp.zingmp3Controller.getSong);

// getDetailPlaylist
router.get("/detailplaylist/:id", _zingmp.zingmp3Controller.getDetailPlaylist);

// getHome
router.get("/home", _zingmp.zingmp3Controller.getHome);

// getTop100
router.get("/top100", _zingmp.zingmp3Controller.getTop100);

// getChartHome
router.get("/charthome", _zingmp.zingmp3Controller.getChartHome);

// getNewReleaseChart
router.get("/newreleasechart", _zingmp.zingmp3Controller.getNewReleaseChart);

// getInfoSong
router.get("/infosong", _zingmp.zingmp3Controller.getInfo);

// getArtist
router.get("/artist", _zingmp.zingmp3Controller.getArtist);

// getArtistSong
router.get("/artistsongs", _zingmp.zingmp3Controller.getArtistSong);

// getArtistPlaylists
router.get("/artistplaylists", _zingmp.zingmp3Controller.getArtistPlaylist);

// getLyric
router.get("/lyric/:id", _zingmp.zingmp3Controller.getLyric);

// search
router.get("/search", _zingmp.zingmp3Controller.search);

// suggestions
router.get("/suggestions", _zingmp.zingmp3Controller.suggestions);

// getListMV
router.get("/listmv", _zingmp.zingmp3Controller.getListMV);

// getCategoryMV
router.get("/categorymv", _zingmp.zingmp3Controller.getCategoryMV);

// getVideo
router.get("/video", _zingmp.zingmp3Controller.getVideo);
var _default = router;
exports["default"] = _default;