import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';

import * as E from '../entities';
import * as U from '../utils';
import { HttpException } from '../exceptions';
import { JWTService } from '../services';

@Injectable()
export class SecureFileMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(E.AttachFile)
    private readonly attachFile: Repository<E.AttachFile>,
    private readonly jwtService: JWTService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers['authorization'] as string;

    if (!bearer) throw new HttpException('NOT_FOUND_TOKEN');

    const [, token] = bearer.split(' ');
    const [verificationResponse, verifyError] = this.jwtService.verifyToken(token);
    if (verifyError) throw verifyError;

    const { id: userId } = verificationResponse;

    if (!userId) throw new HttpException('INVALID_TOKEN');

    const file = await this.attachFile
      .findOne({
        where: {
          filename: `${req.params.filename || req.params.path}`,
          userId,
        },
      })
      .catch((reason: Error) => {
        U.logger.error(reason);
        throw new HttpException('COMMON_ERROR');
      });

    if (!file) throw new HttpException('NOT_FOUND_DATA');

    next();
  }
}
