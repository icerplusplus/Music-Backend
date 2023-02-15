import axios from "axios";
import Token from "../models/Token";
import { basic, getToken } from "../utils/spotifyManager";
import {
  getTheLastTokenFromDb,
  refreshTokenOnServer,
} from "../utils/tokenManager";

export const spotifyMiddleware = {
  spotifyAuth: async (req, res, next) => {
    const timeCurrent = new Date().getTime();
    const token = await getTheLastTokenFromDb();

    const expiresAt = parseInt(token?.expiresAt);
    // console.log("timeCurrent: ", timeCurrent, expiresAt);
    if (timeCurrent >= expiresAt - 300000) {
      // console.log("largestToken", token.accessToken);
      // refesh the token
      const response = await getToken();
      refreshTokenOnServer(response)
        .then(() => {
          next();
        })
        .catch((err) => {
          console.log("not refresh token in spotifyMiddleware");
        });
    }
    next();
  },
};
