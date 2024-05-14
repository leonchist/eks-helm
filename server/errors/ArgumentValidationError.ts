import httpStatus from 'http-status';

import { CustomError } from './CustomError';

export class ArgumentValidationError extends CustomError {
  messages: Object;

  constructor(message: string, messages: Object[], reasonCode?: string) {
    super(message, httpStatus.BAD_REQUEST, reasonCode);

    this.messages = messages.reduce((total, element) => {
      return {...total, ...element}
    }, {});
  }
}
