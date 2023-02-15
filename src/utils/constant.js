import "dotenv/config";

export const options = {
  method: "GET",
  url: "https://spotify-scraper.p.rapidapi.com/v1",
  headers: {
    "X-RapidAPI-Key": `${process.env.RAPIDAPI_API_KEY}`,
    "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
  },
};

export const spotifyScopes = [
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
];
