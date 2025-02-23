/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import { APIs_V1 } from "~/routes/v1";
import {errorHandlingMiddleware} from "~/middlewares/errorHandlingMiddleware"

const START_SERVER = () => {
  const app = express();

  app.use(express.json());

  app.use("/v1", APIs_V1);

  //middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello, I am running at ${env.APP_HOST}:${env.APP_PORT}/`);
  });

  exitHook(() => {
    CLOSE_DB();
  });
};


CONNECT_DB()
  .then(() => {
    START_SERVER();
  })
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
