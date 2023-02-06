import { configSpotifyApi } from "./../libs/spotifyInstance";
import "dotenv/config";
import Token from "./../models/Token";
// get spotify instance
const spotifyApi = configSpotifyApi();

export const spotifyController = {
  createSpotifyAuthorize: async (req, res) => {
    const creatAuthor = spotifyApi.createAuthorizeURL([
      "ugc-image-upload",
      "user-read-playback-state",
      "app-remote-control",
      "user-modify-playback-state",
      "playlist-read-private",
      "user-follow-modify",
      "playlist-read-collaborative",
      "user-follow-read",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-library-modify",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-read-email",
      "user-top-read",
      "streaming",
      "user-read-recently-played",
      "user-read-private",
      "user-library-read",
    ]);

    return res.redirect(creatAuthor);
  },
  saveToken: async (req, res) => {
    const code = req.query.code;
    const spotifyToken = await spotifyApi.authorizationCodeGrant(code);

    const { access_token, refresh_token } = spotifyToken.body;

    // create new token and save to database
    const newToken = new Token({
      accessToken: access_token,
      refreshToken: refresh_token,
    });
    newToken.save();
    console.log(spotifyToken.body);
    // set new access and refresh token
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    return res.status(200).json({});
  },
  getAlbums: async (req, res) => {
    // const albums = await spotifyApi.getAlbums();

    const albums = await spotifyApi.getFeaturedPlaylists({
      limit: 10,
      offset: 0,
      country: "VN",
      locale: "sv_VN",
    });

    return res.status(200).json({ data: albums });
  },
  getPlaylists: async (req, res) => {
    const playLists = await spotifyApi.getPlaylist(["37i9dQZF1DX1vC8WamgJcA"]);
    return res.status(200).json({ data: playLists });
  },
  // get track detail
  getTrack: async (req, res) => {
    const track = await spotifyApi.searchTracks("artist:Thich Em Hoi Nhieu");
    return res.status(200).json({ data: track });
  },
};
//https://github.com/lethanhvietctt5/react-spotify
//  getAlbumTracks
// PORT=8008
// SPOTIFY_CLIENT_ID=6d6d1aafeb92496fa2cb7c63d95c1494
// SPOTIFY_CLIENT_SECRET=4a2c1906b6a546f9a141214d3eade304
// MONGO_URI=mongodb+srv://cmusicdatabase:cmusicdatabase@cluster0.fsdgjel.mongodb.net/?retryWrites=true&w=majority
