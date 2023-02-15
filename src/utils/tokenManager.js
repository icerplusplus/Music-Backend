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
        accessToken: token.access_token,
        refreshToken: token.refresh_token || null,
        expiresIn: token.expires_in,
        expiresAt: new Date().getTime() + parseInt(token.expires_in) * 1000,
      },
    },
    { new: true }
  );
};
