import mongoose from "mongoose";

const favoritePlaylistSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
      required: true,
      maxlength: 255,
    },
    title: {
      type: "string",
      required: true,
      maxlength: 30,
    },
    songs: {
      type: "array",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("FavoritePlaylist", favoritePlaylistSchema);
