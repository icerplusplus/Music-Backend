import Token from "../models/Token";

export const getTheLastTokenFromDb = async () => {
  const tokens = await Token.find().sort({ _id: -1 });
  return tokens[0];
};

export const refreshTokenOnServer = async (token) => {
  const lastedToken = await getTheLastTokenFromDb();
  console.log("lastedToken.id: ", lastedToken.id);
  const upgradeToken = await Token.findByIdAndUpdate(
    lastedToken._id,
    {
      $set: {
        accessToken: token.access_token || lastedToken.accessToken,
        refreshToken: token.refresh_token || lastedToken.refreshToken,
        expiresIn: token.expires_in || 3600,
        expiresAt:
          new Date().getTime() + parseInt(token.expires_in || 3600) * 1000,
      },
    },
    { new: true }
  );
};
