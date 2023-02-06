import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    accessToken: {
      type: "string",
    },
    refreshToken: {
      type: "string",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
