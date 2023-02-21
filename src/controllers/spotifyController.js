import axios from "axios";
import "dotenv/config";
import { spotifyScopes } from "../utils/constant";
import { getToken, getTopAlbums, spotifyApi } from "../utils/spotifyManager";
import {
  getTheLastTokenFromDb,
  refreshTokenOnServer,
} from "../utils/tokenManager";
import ytdl from "ytdl-core";
import ytdlDiscord from "ytdl-core-discord";
import search from "yt-search";
import { Promise } from "bluebird";

export const spotifyController = {
  spotifyCallback: async (req, res) => {
    try {
      const code = req.query.code;
      const { body } = await spotifyApi.authorizationCodeGrant(code);

      const accessToken = body.access_token;
      const refreshToken = body.refresh_token;

      // Use the access token to make requests to the Spotify API
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      refreshTokenOnServer(body)
        .then(() => console.log("token upgraded."))
        .catch((err) => console.log(err));

      res.send({ access_token: accessToken, refresh_token: refreshToken });
    } catch (error) {
      console.log("Spotify callback failed", error);
    }
  },
  spotifyAuthorize: async (req, res) => {
    try {
      const state = Math.random().toString(36).substring(7);
      const authorizeUrl = spotifyApi.createAuthorizeURL(
        spotifyScopes,
        state,
        true
      );
      res.redirect(authorizeUrl);
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
  getTopArtists: async (req, res) => {
    try {
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get("https://api.spotify.com/v1/search", {
          params: {
            type: "artist",
            q: 'genre:"vietnamese"',
            market: "VN",
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${lastedToken.accessToken}`,
          },
        })
        .then((response) => {
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          return res.status(404).json({ message: error });
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
      // tracks Hot In Vn
      const playlistId = "37i9dQZEVXbLdGSmz6xilI";
      const limit = 10;
      const lastedToken = await getTheLastTokenFromDb();
      axios
        .get(
          `${process.env.SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: "Bearer " + lastedToken.accessToken,
            },
            params: {
              limit: limit,
              offset: 0,
              // time_range: "short_term",
              market: "VN",
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
  getFeaturedPlaylists: async (req, res) => {
    try {
      console.log(req.query.limit);
      const limit = req.query.limit || 20;
      const offset = 0;
      const lastedToken = await getTheLastTokenFromDb();

      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/browse/featured-playlists`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
          params: {
            limit,
            offset,
            country: "VN",
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
      const limit = 10;
      const lastedToken = await getTheLastTokenFromDb();

      axios
        .get(
          `${process.env.SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: "Bearer " + lastedToken.accessToken,
            },
            params: {
              limit,
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
  getTrackById: async (req, res) => {
    try {
      const { trackId } = req.params;
      const lastedToken = await getTheLastTokenFromDb();

      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/tracks/${trackId}`, {
          headers: {
            Authorization: "Bearer " + lastedToken.accessToken,
          },
          params: {
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
  getCurrentDevices: async (req, res) => {
    try {
      const lastedToken = await getTheLastTokenFromDb();

      axios
        .get(`${process.env.SPOTIFY_API_BASE_URL}/me/player/devices`, {
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
  playTrackWithUrl: async (req, res) => {
    // convert youtube video to mp3 audio
    try {
      const name = req.params.name;
      search(name, async (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error searching YouTube");
        } else {
          const video = result.videos[0];

          const videoInfo = await ytdl.getInfo(video.videoId);
          const audioFormats = ytdlDiscord.filterFormats(
            videoInfo.formats,
            "audioonly"
          );

          return res.status(200).json({
            data: {
              audioUrl: audioFormats[0].url,
            },
          });
        }
      });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
  getTrackUrlByNames: async (req, res) => {
    try {
      const tracks = req.body.tracks;
      let data = [];

      const promises = tracks.map(async (item) => {
        return search(item.name, async (err, result) => {
          if (err) {
            console.log("err: ", err);
            return "";
          } else {
            const video = result.videos[0];

            const videoInfo = await ytdl.getInfo(video.videoId);
            const audioFormats = await ytdlDiscord.filterFormats(
              videoInfo.formats,
              "audioonly"
            );

            data.push({
              id: item.id,
              name: item.name,
              audioUrl: audioFormats[0]?.url || audioFormats[1]?.url,
              durationMs:
                audioFormats[0]?.approxDurationMs ||
                audioFormats[1]?.approxDurationMs,
            });

            return audioFormats[0]?.url || audioFormats[1]?.url;
          }
        }); // Return the promise of each url
      });

      // Now that our array of promises are set up, use Promise.all to
      // execute them all in parallel

      await Promise.all(promises)
        .then((responses) => {
          // Do something with responses
          // array of responses in the order of urls
          // eg: [ { resp1 }, { resp2 }, ...]
          setTimeout(() => {
            if (responses.length === tracks.length) {
              res.status(200).json({ data: data });
            }
          }, 6500);
        })
        .catch((e) => {
          // handle errors

          res.status(404).json({ message: "Error while fetching responses" });
        });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },
};
