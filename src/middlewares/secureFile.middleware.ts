import { Response, NextFunction, Request } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { WhereOptions } from 'sequelize';

import * as M from '../entities';
import * as U from '../utils';
import { HttpException } from '../exceptions';
import { JWTService } from '../services';

@Injectable()
export class SecureFileMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JWTService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers['authorization'] as string;

    if (!bearer) throw new HttpException('NOT_FOUND_TOKEN');

    const [, token] = bearer.split(' ');
    const [verificationResponse, verifyError] = this.jwtService.verifyToken(token);
    if (verifyError) throw verifyError;

    const { id: userId, isSupervisor } = verificationResponse;

    if (!isSupervisor && !userId) throw new HttpException('INVALID_TOKEN');

    const where: WhereOptions<M.AttachFile> = {
      fileName: `${req.params.filename || req.params.path}`,
      ...(isSupervisor ? {} : { userId }),
    };

    const file = await M.AttachFile.findOne({
      where,
    }).catch((reason) => {
      U.logger.error(reason);
      throw new HttpException('ATTACH_FILE_FAIL');
    });

    if (!file) throw new HttpException('NOT_FOUND_DATA');

    next();
  }
}
