import axios from "axios";
import { options } from "./../utils/constant";

// get Genres
// 1 genre co nhieu playlist
// 1 playlist co nhieu track

const musicController = {
  getTopTrack: async (req, res) => {
    try {
      const { data } = await axios.get(`${options.url}/chart/tracks/top`, {
        headers: options.headers,
        params: { region: "VN" },
      });
      console.log(data);

      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log("Not fetch top track :))");
      return res.status(500).json({
        error: error,
      });
    }
  },
  getTopArtists: async (req, res) => {
    try {
      const { data } = await axios.get(`${options.url}/chart/artists/top`, {
        headers: options.headers,
        params: { region: "VN" },
      });
      console.log(data);

      res.status(200).json({
        data: data,
      });
    } catch (error) {
      console.log("Not fetch top artists :))");
      return res.status(500).json({
        error: error,
      });
    }
  },
  getTopAlbums: async (req, res) => {
    try {
      const { data } = await axios.get(`${options.url}/chart/albums/top`, {
        headers: options.headers,
        params: { region: "VN" },
      });
      console.log(data);

      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log("Not fetch top artists :))");
      return res.status(500).json({
        error: error,
      });
    }
  },

  getGenres: async (req, res) => {
    try {
      const { data } = await axios.get(`${options.url}/home`, {
        headers: options.headers,
        params: { region: "VN" },
      });
      console.log(data);

      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log("Not fetch Genres");
      return res.status(500).json({
        error: error,
      });
    }
  },

  // get track list with playlist Id
  getPlaylist: async (req, res) => {
    const playlistId = req.params.playlistId || "37i9dQZF1DWVbRrSFENdgA";

    try {
      const { data } = await axios.get(`${options.url}/playlist/contents`, {
        headers: options.headers,
        params: { playlistId },
      });
      console.log(data);

      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log("Not fetch playlist with id: " + playlistId);
      return res.status(500).json({
        error: error,
      });
    }
  },

  // find Track on SoundCloud
  // find by Track ID, track share URL, track name, ...
  getTrack: async (req, res) => {
    const trackId = req.params.trackId;

    try {
      const { data } = await axios.get(
        `${options.url}/track/download/soundcloud`,
        {
          headers: options.headers,
          params: { track: trackId },
        }
      );
      console.log(data);

      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log("Not fetch track with id: " + trackId);
      return res.status(500).json({
        error: error,
      });
    }
  },
};
export default musicController;
