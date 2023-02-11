import "dotenv/config";

export const options = {
  method: "GET",
  url: "https://spotify-scraper.p.rapidapi.com/v1",
  headers: {
    "X-RapidAPI-Key": `${process.env.RAPIDAPI_API_KEY}`,
    "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
  },
};
