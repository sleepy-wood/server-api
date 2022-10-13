import { Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import * as I from '@interface/index';
import * as M from '@model/index';
import * as U from '@util/index';
import { HttpException } from '@exception/index';
import { JWTService } from '@service/index';

@Injectable()
export class SupervisorMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JWTService) {}

  async use(req: I.RequestWithSupervisor, res: Response, next: NextFunction) {
    const bearer: string = req.headers['authorization'];

    if (!bearer) throw new HttpException('NOT_FOUND_TOKEN');

    const [, token] = bearer.split(' ');
    const [verificationResponse, verifyError] = this.jwtService.verifyToken(token);
    if (verifyError) throw verifyError;

    const { id: supervisorId, isSupervisor } = verificationResponse;

    if (!isSupervisor || !supervisorId) throw new HttpException('INVALID_TOKEN');

    const supervisor = await M.Supervisor.findByPk(supervisorId).catch((reason) => {
      U.logger.error(reason);
      throw new HttpException('SUPERVISOR_VALIDATION');
    });

    if (!supervisor) throw new HttpException('SUPERVISOR_VALIDATION');

    req.supervisor = supervisor;

    next();
  }
}
