import mongoose from "mongoose";
import { defaultAvatar, defaultSongThumb } from "../utils/constant";

const songSchema = new mongoose.Schema(
  {
    encodeId: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
    },
    alias: {
      type: "string",
    },
    artistsNames: {
      type: "string",
    },
    thumbnailM: {
      type: "string",
      default: defaultSongThumb,
    },
    duration: {
      type: "number",
    },
    isLocal: {
      type: "boolean",
      default: true,
    },
    audioUrl: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Song", songSchema);
