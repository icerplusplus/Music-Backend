import express from "express";
import authController from "../controllers/auth.controller";
import { zingmp3Controller } from "../controllers/zingmp3.controller";
import middleWare from "./../middlewares";

const router = express.Router();

// auth routers
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh", authController.getRefreshToken);
router.get("/logout/:id", middleWare.verifyToken, authController.logout);
router.post(
  "/changepassword/:id",
  middleWare.verifyToken,
  authController.changePassword
);

// zing mp3 routers
// getSong
router.get("/song/:id", zingmp3Controller.getSong);

// getDetailPlaylist
router.get("/detailplaylist/:id", zingmp3Controller.getDetailPlaylist);

// getHome
router.get("/home", zingmp3Controller.getHome);

// getTop100
router.get("/top100", zingmp3Controller.getTop100);

// getChartHome
router.get("/charthome", zingmp3Controller.getChartHome);

// getNewReleaseChart
router.get("/newreleasechart", zingmp3Controller.getNewReleaseChart);

// getInfoSong
router.get("/infosong", zingmp3Controller.getInfo);

// getArtist
router.get("/artist", zingmp3Controller.getArtist);

// getArtistSong
router.get("/artistsongs", zingmp3Controller.getArtistSong);

// getArtistPlaylists
router.get("/artistplaylists", zingmp3Controller.getArtistPlaylist);

// getLyric
router.get("/lyric/:id", zingmp3Controller.getLyric);

// search
router.get("/search", zingmp3Controller.search);

// suggestions
router.get("/suggestions", zingmp3Controller.suggestions);

// getListMV
router.get("/listmv", zingmp3Controller.getListMV);

// getCategoryMV
router.get("/categorymv", zingmp3Controller.getCategoryMV);

// getVideo
router.get("/video", zingmp3Controller.getVideo);

export default router;
