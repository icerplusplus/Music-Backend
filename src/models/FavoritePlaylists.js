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
    thumbnail: {
      type: "string",
      default:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxubyUyMG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    songs: {
      type: "array",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("FavoritePlaylist", favoritePlaylistSchema);
