import axios from "axios";
import "dotenv/config";

// Endpoint to get a user's profile information
export const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export const getToken = async () => {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "client_credentials",
    },
  });

  return response.data;
};

export const getTopAlbums = async (accessToken) => {
  console.log("getTopAlbums: ", accessToken);
  const { data } = await axios.get(
    `${process.env.SPOTIFY_API_BASE_URL}/browse/new-releases?country=VN&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (data) return data.albums.items;
  return null;
};
