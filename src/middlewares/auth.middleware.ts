import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, NextFunction } from 'express';
import { Repository } from 'typeorm';

import * as E from '../entities';
import * as I from '../interfaces';
import { HttpException } from '../exceptions';
import { JWTService } from '../services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(E.User)
    private readonly user: Repository<E.User>,
    private readonly jwtService: JWTService,
  ) {}

  async use(req: I.RequestWithUser, res: Response, next: NextFunction) {
    const bearer: string = req.headers['authorization'];

    if (!bearer) throw new HttpException('NOT_FOUND_TOKEN');

    const [, token] = bearer.split(' ');
    const [verificationResponse, verifyError] = this.jwtService.verifyToken(token);
    if (verifyError) throw verifyError;
    const { id: userId } = verificationResponse;

    if (!userId) throw new HttpException('INVALID_TOKEN');

    const user = await this.user.findOne({
      where: { id: userId },
    });

    if (!user) throw new HttpException('USER_VALIDATION');

    if (user.type === I.UserType.None) throw new HttpException('USER_NO_TYPE');

    req.user = user;

    next();
  }
}
