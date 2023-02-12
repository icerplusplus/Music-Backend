import express from "express";
import musicController from "../controllers/musicController";

const router = express.Router();

// Main routers
router.get("/genres", musicController.getGenres);
router.get("/playlist", musicController.getPlaylist);
router.get("/track", musicController.getTrack);
router.get("/top-tracks", musicController.getTopTrack);
router.get("/top-albums", musicController.getTopAlbums);
router.get("/top-artists", musicController.getTopArtists);

export default router;
