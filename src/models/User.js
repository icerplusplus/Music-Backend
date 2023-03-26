import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      minlength: 8,
      maxlength: 30,
    },
    email: {
      type: "string",
      required: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      minlength: 8,
      maxlength: 255,
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
    accessToken: {
      type: "string"
    },
    refreshToken: {
      type: "string"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
