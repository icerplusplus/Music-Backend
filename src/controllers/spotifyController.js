import axios from "axios";
import "dotenv/config";
import { spotifyScopes } from "../utils/constant";
import { getToken, getTopAlbums } from "../utils/spotifyManager";
import { getTheLastTokenFromDb } from "../utils/tokenManager";

export const spotifyController = {
  spotifyAuthorize: async (req, res) => {
    try {
      const response = await getToken();

      return res.status(200).json({
        data: {
          token: {
            access_token: response.access_token,
            expiresIn: response.expires_in,
            expiresAt:
              new Date().getTime() + parseInt(response?.expires_in) * 1000,
          },
        },
      });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getTopAlbums: async (req, res) => {
    try {
      const lastedToken = await getTheLastTokenFromDb();

      axios
        .get(
          `${process.env.SPOTIFY_API_BASE_URL}/browse/new-releases?limit=10`,
          {
            headers: {
              Authorization: `Bearer ${lastedToken.accessToken}`,
            },
            params: {
              market: "VN",
            },
          }
        )
        .then((response) => {
          return res.status(200).json({ data: response.data });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getAlbumTracks: async (req, res) => {
    try {
      const { albumId } = req.params;
      const limit = 10;
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/albums/${albumId}/tracks`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
          params: {
            limit: limit,
          },
        })
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getTopTracks: async (req, res) => {
    try {
      const limit = 10;
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/audio-features`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
          params: {
            limit: limit,
            offset: 0,
            // time_range: "short_term",
            market: "VN",
          },
        })
        .then((response) => {
          // handle response data
          console.log(response.data);
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getGenres: async (req, res) => {
    try {
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(
          `${process.env.SPOTIFY_API_BASE_URL}/recommendations/available-genre-seeds`,
          {
            headers: {
              Authorization: "Bearer " + lastedToken.accessToken,
            },
          }
        )
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getSeveralBrowseCategories: async (req, res) => {
    try {
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/browse/categories`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
          params: {
            limit: 10,
            market: "VN",
          },
        })
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getSingleBrowseCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(
          `${process.env.SPOTIFY_API_BASE_URL}/browse/categories/${categoryId}`,
          {
            headers: {
              Authorization: "Bearer " + lastedToken.accessToken,
            },
            params: { market: "VN" },
          }
        )
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getCategoryPlaylists: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(
          `${process.env.SPOTIFY_API_BASE_URL}/browse/categories/${categoryId}/playlists`,
          {
            headers: {
              Authorization: "Bearer " + lastedToken.accessToken,
            },
            params: { limit: 10, market: "VN" },
          }
        )
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getPlaylistTracks: async (req, res) => {
    try {
      const { playlistId } = req.params;
      const lastedToken = await getTheLastTokenFromDb();
      console.log("lastedToken: ", timeCurrent, expiresAt);

      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/playlists/${playlistId}`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
        })
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getTrackById: async (req, res) => {
    try {
      const { trackId } = req.params;
      const lastedToken = await getTheLastTokenFromDb();
      console.log("lastedToken: ", lastedToken);
      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/tracks/${trackId}`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
        })
        .then((response) => {
          // handle response data
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          // handle error
          return res.status(404).json({ message: error });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
};
// react-native-spotify-remote
