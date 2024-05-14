import { json as bodyParserJSON } from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import rateLimit from "express-rate-limit";

import { ROUTE_VERSION, limiteOptions } from "config";

import { MESSAGES } from "consts";

import { errorHandlerMiddleware, requestLoggerMiddleware } from "middlewares";

import appRoutes from "routes";

const port = process.env.PORT || 8000;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  // Apply the rate limiter to all requests
  app.use(rateLimit(limiteOptions));

  app.use(requestLoggerMiddleware);

  // Health check
  app.use("/health", function (_req, res) {
    res.send("OK");
  });

  app.use(`/api/${ROUTE_VERSION}`, appRoutes);

  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.info(`${MESSAGES.SERVER_RUN_SUCCESS} on PORT: ${port}`);
  });
};

export default backendSetup;
