import { MESSAGES } from "consts";

const { MAX, WINDOWMS } = process.env;

export const limiteOptions = {
  windowMs: 1000 * +WINDOWMS,
  max: +MAX,
  message: { message: MESSAGES.TOO_MANY_REQUEST_ERROR },
};
