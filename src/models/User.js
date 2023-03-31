import mongoose from "mongoose";
import { defaultAvatar } from "../utils/constant";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      minlength: 5,
      maxlength: 30,
    },
    email: {
      type: "string",
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      maxlength: 255,
    },
    avatar: {
      type: "string",
      default: defaultAvatar,
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
    accessToken: {
      type: "string",
    },
    refreshToken: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
