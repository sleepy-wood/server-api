import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as I from '@interface/index';
import * as U from '@util/index';
import * as M from '@model/index';
import { HttpException } from '@exception/index';

@Injectable()
export class JWTService {
  constructor(private readonly configService: ConfigService) {}

  verifyToken(token: string): [I.DataStoredInToken, HttpException] {
    const secret = this.configService.get<string>('SECRET');

    try {
      const verificationResponse = jwt.verify(token, secret) as I.DataStoredInToken;
      return [verificationResponse, null];
    } catch (err) {
      U.logger.error(err);
      return [null, new HttpException('INVALID_TOKEN')];
    }
  }

  getJWTToken(user: M.User | M.Supervisor, expiresIn?: number): [string, HttpException] {
    expiresIn = expiresIn || 31557600000; // 1y

    const secret = this.configService.get<string>('SECRET');
    const dataStoredInToken: I.DataStoredInToken =
      user instanceof M.Supervisor ? { id: user.id, isSupervisor: user.isSupervisor } : { id: user.id };

    try {
      return [jwt.sign(dataStoredInToken, secret, { expiresIn }), null];
    } catch (err) {
      U.logger.error(err);
      return [null, new HttpException('INVALID_TOKEN')];
    }
  }
}
