import express from "express";
import musicController from "../controllers/musicController";
import { spotifyMiddleware } from "../middlewares/spotifyMiddleware";
import { spotifyController } from "./../controllers/spotifyController";

const router = express.Router();

// spotify routers
router.get("/", spotifyController.spotifyAuthorize);
router.get(
  "/top-albums",
  spotifyMiddleware.spotifyAuth,
  spotifyController.getTopAlbums
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

export default router;
