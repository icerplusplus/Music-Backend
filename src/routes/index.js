import express from "express";
import musicController from "../controllers/musicController";
import { zingmp3Controller } from "../controllers/zingmp3Controller";
import { spotifyMiddleware } from "../middlewares/spotifyMiddleware";
import { spotifyController } from "./../controllers/spotifyController";

const router = express.Router();

// spotify routers
router.get("/", spotifyController.spotifyAuthorize);
router.get("/callback", spotifyController.spotifyCallback);
router.get(
  "/top-albums",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTopAlbums
);

router.get(
  "/top-artists",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTopArtists
);

router.get(
  "/album-tracks/:albumId",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getAlbumTracks
);

router.get(
  "/top-tracks",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTopTracks
);

router.get(
  "/featured-playlists",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getFeaturedPlaylists
);

router.get(
  "/genres",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getGenres
);
router.get(
  "/several-browse-categories",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getSeveralBrowseCategories
);

// remove in feature
router.get(
  "/single-browse-category/:categoryId",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getSingleBrowseCategory
);

router.get(
  "/category-playlists/:categoryId",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getCategoryPlaylists
);
router.get(
  "/playlist-tracks/:playlistId",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getPlaylistTracks
);
router.get(
  "/track/:trackId",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTrackById
);

router.get(
  "/track-player/:name",
  spotifyMiddleware.spotifyAuth,
  spotifyController.playTrackWithUrl
);

router.get(
  "/current-devices",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getCurrentDevices
);

router.post(
  "/track-urls",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTrackUrlByNames
);

// artist
router.get(
  "/artist/:id",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getArtistById
);
router.get(
  "/top-tracks-of-artist/:id",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTopTracksByArtistId
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
