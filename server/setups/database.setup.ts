import { MESSAGES } from "consts";

import { DBConnect, Logger } from "utils";

const databaseSetup = async (next: () => void) => {
  try {
    await DBConnect.dbCreate();
    Logger.log(MESSAGES.DATABASE_CONNECTION_SUCCESS);
    next();
  } catch (error) {
    Logger.log(error);
    Logger.error(MESSAGES.DATABASE_CONNECTION_FAILURE);
  }
};

export default databaseSetup;
