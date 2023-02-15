import mongoose from "mongoose";
import "dotenv/config";

export const mongodbInstance = () => {
  // mongoose config
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("🚀 connected to mongodb");
    })
    .catch((err) => {
      console.log("🚀 connect to mongodb failed\n", err);
    });
};
