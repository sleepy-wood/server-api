import { Injectable } from '@nestjs/common';

import * as I from '../interfaces';
import * as M from '../entities';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class AttachFileService {
  constructor(
    @InjectModel(M.AttachFile)
    private readonly attachFile: typeof M.AttachFile,
  ) {}

  async findOneByPath(req: I.RequestWithUser, path: string): Promise<M.AttachFile> {
    return this.attachFile
      .findOne({
        where: { path, userId: req.user.id },
        attributes: { exclude },
        transaction: req.transaction,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('ATTACH_FILE_FAIL');
      });
  }

  async updateByPath(
    req: I.RequestWithUser,
    fromPath: string | string[],
    toPath: string | string[],
    updateDto: UpdateDto,
  ): Promise<boolean> {
    if (Array.isArray(fromPath) && Array.isArray(toPath)) {
      let i = 0;
      for (const from of fromPath) {
        updateDto.path = toPath[i++];
        await this.attachFile
          .update(updateDto, {
            where: { path: from, userId: req.user.id },
            transaction: req.transaction,
          })
          .catch((reason) => {
            U.logger.error(reason);
            throw new HttpException('ATTACH_FILE_FAIL');
          });
      }
    } else if (typeof fromPath === 'string' && typeof toPath === 'string') {
      updateDto.path = toPath;
      await this.attachFile
        .update(updateDto, {
          where: { path: fromPath, userId: req.user.id },
          transaction: req.transaction,
        })
        .catch((reason) => {
          U.logger.error(reason);
          throw new HttpException('ATTACH_FILE_FAIL');
        });
    }

    return true;
  }
}
