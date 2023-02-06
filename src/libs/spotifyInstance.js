import SpotifyWebApi from "spotify-web-api-node";
import "dotenv/config";

// credentials are optional
export const configSpotifyApi = () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: "http://localhost:8008/api/spotify/authorization",
  });

  return spotifyApi;
};
