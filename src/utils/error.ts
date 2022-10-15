import { ErrorCodes } from '../constants';
import { HttpException } from '../exceptions';
import { logger } from '../utils';

export const handleError = (err: any, key: keyof typeof ErrorCodes): [null, HttpException] => {
  logger.error(err);
  return [null, new HttpException(key)];
};
