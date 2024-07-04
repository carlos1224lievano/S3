import dotenv from 'dotenv';
dotenv.config();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import { userRouter } from './user/infrastructure/routes/user-router';
import { publicationRouter } from "./publication/infrastructure/routes/publication-router";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/users", userRouter);
  app.use("/publications", publicationRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
