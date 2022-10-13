import { Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import * as I from '@interface/index';
import * as M from '@model/index';
import * as U from '@util/index';
import { HttpException } from '@exception/index';
import { JWTService } from '@service/index';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JWTService) {}

  async use(req: I.RequestWithUser, res: Response, next: NextFunction) {
    const bearer: string = req.headers['authorization'];

    if (!bearer) throw new HttpException('NOT_FOUND_TOKEN');

    const [, token] = bearer.split(' ');
    const [verificationResponse, verifyError] = this.jwtService.verifyToken(token);
    if (verifyError) throw verifyError;
    const { id: userId, isSupervisor } = verificationResponse;

    if (!userId || isSupervisor) throw new HttpException('INVALID_TOKEN');

    const user = await M.User.findByPk(userId, {
      include: [{ model: M.CareApplication }, { model: M.CareGiverRegistration }],
    }).catch((reason) => {
      U.logger.error(reason);
      throw new HttpException('USER_VALIDATION');
    });

    if (!user) throw new HttpException('USER_VALIDATION');

    if (user.type === I.UserType.NoType) throw new HttpException('USER_NO_TYPE');

    req.user = user;

    next();
  }
}
