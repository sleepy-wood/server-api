import { ErrorCodes } from '@constant/index';
import { HttpException } from '@exception/index';
import { logger } from '@util/index';

export const handleError = (err: any, key: keyof typeof ErrorCodes): [null, HttpException] => {
  logger.error(err);
  return [null, new HttpException(key)];
};
