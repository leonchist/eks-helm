import { DBConnect } from "../dbConnector";

import { TodoEntity } from "entities";

export const getTodoRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(TodoEntity);
};
