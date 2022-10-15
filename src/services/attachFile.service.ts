import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class AttachFileService {
  constructor(
    @InjectRepository(E.AttachFile)
    private readonly attachFile: Repository<E.AttachFile>,
  ) {}

  async findOneByPath(req: I.RequestWithUser, path: string): Promise<E.AttachFile> {
    return this.attachFile
      .findOne({
        where: { path, userId: req.user.id },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async updateByPath(
    req: I.RequestWithUser,
    fromPath: string | string[],
    toPath: string | string[],
    updateDto: any,
  ): Promise<boolean> {
    if (Array.isArray(fromPath) && Array.isArray(toPath)) {
      let i = 0;
      for (const from of fromPath) {
        updateDto.path = toPath[i++];
        await this.attachFile.update({ path: from, userId: req.user.id }, updateDto).catch((reason) => {
          U.logger.error(reason);
          throw new HttpException('COMMON_ERROR');
        });
      }
    } else if (typeof fromPath === 'string' && typeof toPath === 'string') {
      updateDto.path = toPath;
      await this.attachFile.update({ path: fromPath, userId: req.user.id }, updateDto).catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('COMMON_ERROR');
      });
    }

    return true;
  }
}
