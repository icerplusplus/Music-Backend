import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import { mongodbInstance } from "./libs/mongodbInstance";

const main = async () => {
  // create and setup express app
  const app = express();

  // use middleware
  app.use(cors(), express.json());

  // routers
  app.use("/api", router);

  app.listen(process.env.PORT, () => {
    // connect to mongodb server
    mongodbInstance();

    console.log(
      `🚀 CMsuicApi Server is running on port http://localhost:${process.env.PORT} ...`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
