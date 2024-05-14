import { DBConnect } from "../dbConnector";

import { BreakTokensEntity } from "entities";

export const getBreakTokensRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(BreakTokensEntity);
};
