import "dotenv/config";

export const options = {
  method: "GET",
  url: "https://spotify-scraper.p.rapidapi.com/v1",
  headers: {
    "X-RapidAPI-Key": `${process.env.RAPIDAPI_API_KEY}`,
    "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
  },
};

export const defaultAvatar = "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

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
