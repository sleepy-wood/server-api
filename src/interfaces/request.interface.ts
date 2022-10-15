import * as core from 'express-serve-static-core';
import { Request } from 'express';
import { Transaction } from 'sequelize';

import { User } from '../entities';

export interface RequestWithUser<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User;
  transaction?: Transaction;
}
