import { HttpException as Error } from '@nestjs/common';

import { ErrorCodes } from '@constant/index';

export class HttpException extends Error {
  constructor(key: keyof typeof ErrorCodes) {
    super(ErrorCodes[key].message, ErrorCodes[key].status);
  }
}
