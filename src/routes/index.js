import express from "express";
import { spotifyController } from "./../controllers/spotifyController";

const router = express.Router();

// Hide router
router.get("/spotify/authorization", spotifyController.saveToken);

// Main routers
router.get("/", spotifyController.createSpotifyAuthorize);
router.get("/albums", spotifyController.getAlbums);
router.get("/playlists", spotifyController.getPlaylists);
router.get("/track", spotifyController.getTrack);

export default router;
