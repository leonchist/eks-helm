import express from "express";

import { backendSetup, databaseSetup } from "./setups";

const app = express();

databaseSetup(() => {
  backendSetup(app);
});
