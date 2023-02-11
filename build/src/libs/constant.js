"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = void 0;
require("dotenv/config");
var options = {
  method: "GET",
  url: "https://spotify-scraper.p.rapidapi.com/v1",
  headers: {
    "X-RapidAPI-Key": "".concat(process.env.RAPIDAPI_API_KEY),
    "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com"
  }
};
exports.options = options;