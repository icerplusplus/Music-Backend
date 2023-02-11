// import { configSpotifyApi } from "./../libs/spotifyInstance";
// import "dotenv/config";
// import Token from "./../models/Token";
// // get spotify instance
// const spotifyApi = configSpotifyApi();

// export const spotifyController = {
//   createSpotifyAuthorize: async (req, res) => {
//     const creatAuthor = spotifyApi.createAuthorizeURL([
//       "ugc-image-upload",
//       "user-read-playback-state",
//       "app-remote-control",
//       "user-modify-playback-state",
//       "playlist-read-private",
//       "user-follow-modify",
//       "playlist-read-collaborative",
//       "user-follow-read",
//       "user-read-currently-playing",
//       "user-read-playback-position",
//       "user-library-modify",
//       "playlist-modify-private",
//       "playlist-modify-public",
//       "user-read-email",
//       "user-top-read",
//       "streaming",
//       "user-read-recently-played",
//       "user-read-private",
//       "user-library-read",
//     ]);

//     return res.status(200).json(creatAuthor);
//   },
//   saveToken: async (req, res) => {
//     const code = req.query.code;
//     const spotifyToken = await spotifyApi.authorizationCodeGrant(code);

//     const { access_token, refresh_token } = spotifyToken.body;

//     // create new token and save to database
//     const newToken = new Token({
//       accessToken: access_token,
//       refreshToken: refresh_token,
//     });
//     newToken.save();
//     console.log(spotifyToken.body);
//     // set new access and refresh token
//     spotifyApi.setAccessToken(access_token);
//     spotifyApi.setRefreshToken(refresh_token);

//     return res.status(200).json({});
//   },

//   // get the top 10 playlists in Vietnam
//   getTopPlaylists: async (req, res) => {
//     const { limit, location } = req.body;

//     try {
//       const data = await spotifyApi.getFeaturedPlaylists({
//         limit: limit || 10,
//         offset: 0,
//         country: "VN",
//         locale: "sv_VN",
//       });

//       return res.status(200).json({ data: data.body.playlists.items });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ data: {}, errors: { message: "Playlist not found." } });
//     }
//   },

//   // get tracks from playlist id
//   getTrackByPlaylistId: async (req, res) => {
//     const { playlistId } = req.body;

//     try {
//       const data = await spotifyApi.getPlaylistTracks(
//         playlistId || "37i9dQZF1DWVOaOWiVD1Lf"
//       );
//       return res.status(200).json({ data: data.body.items });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ data: {}, errors: { message: "Playlist not found." } });
//     }
//   },

//   // get the top 10 artists in Vietnam
//   getAlbumsByArtist: async (req, res) => {
//     const { artistId } = req.body;
//     try {
//       const data = await spotifyApi.getArtistAlbums(artistId);
//       return res.status(200).json({ data: data.body.items });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ data: {}, errors: { message: "artist'id not found." } });
//     }
//   },

//   getTrackByTrackName: async (req, res) => {
//     const { trackName } = req.body;
//     try {
//       const tracks = await spotifyApi.searchTracks(`${trackName}`);
//       return res.status(200).json({ data: tracks });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ data: {}, errors: { message: "Track name not found." } });
//     }
//   },

//   // GET SONG DETAIL BY SONG ID
//   getSongDetail: async (req, res) => {
//     const { trackId } = res.body;
//     try {
//       const result = await spotifyApi.getTrack(trackId);
//       return res.status(200).json({ data: result.body });
//     } catch (error) {
//       console.error(error);
//       return res
//         .status(500)
//         .json({ data: {}, errors: { message: "Track's id not found." } });
//     }
//   },
// };

// //https://github.com/lethanhvietctt5/react-spotify
// //  getAlbumTracks
// // PORT=8008
// // SPOTIFY_CLIENT_ID=6d6d1aafeb92496fa2cb7c63d95c1494
// // SPOTIFY_CLIENT_SECRET=4a2c1906b6a546f9a141214d3eade304
// // MONGO_URI=mongodb+srv://cmusicdatabase:cmusicdatabase@cluster0.fsdgjel.mongodb.net/?retryWrites=true&w=majority

// // getAlbums: async (req, res) => {
// //   // const albums = await spotifyApi.getAlbums();

// //   const albums = await spotifyApi.getFeaturedPlaylists({
// //     limit: 10,
// //     offset: 0,
// //     country: "VN",
// //     locale: "sv_VN",
// //   });

// //   return res.status(200).json({ data: albums });
// // },
// // getPlaylists: async (req, res) => {
// //   const playLists = await spotifyApi.getPlaylist(["37i9dQZF1DX1vC8WamgJcA"]);
// //   return res.status(200).json({ data: playLists });
// // },
// // // get track detail
"use strict";