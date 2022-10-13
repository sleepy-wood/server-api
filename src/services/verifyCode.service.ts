import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import * as M from '@model/index';
import * as U from '@util/index';
import { HttpException } from '@exception/index';

@Injectable()
export class VerifyCodeService {
  constructor(
    @InjectModel(M.VerifyToken)
    private readonly verifyToken: typeof M.VerifyToken,
  ) {}

  async create(hp: string, code: number): Promise<M.VerifyToken> {
    await this.verifyToken
      .destroy({
        where: { hp },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('VERIFY_TOKEN_FAIL');
      });

    return this.verifyToken
      .create({
        hp,
        code,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('VERIFY_TOKEN_FAIL');
      });
  }

  async verify(hp: string, code: number): Promise<boolean> {
    const count = await this.verifyToken
      .count({
        where: {
          hp,
          code,
        },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('VERIFY_TOKEN_FAIL');
      });

    return count > 0;
  }
}
