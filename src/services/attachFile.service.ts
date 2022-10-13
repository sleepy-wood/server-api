import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import * as D from '@dto/index';
import * as I from '@interface/index';
import * as M from '@model/index';
import * as U from '@util/index';
import { HttpException } from '@exception/index';

type MutableCreateDto = {
  -readonly [K in keyof D.CreateAttachFileDto]: D.CreateAttachFileDto[K];
};
type CreateDto = MutableCreateDto &
  Partial<
    Pick<
      M.AttachFile,
      'type' | 'careApplicationId' | 'careGiverRegistrationId' | 'careGiverReviewId' | 'refusalId' | 'userId'
    >
  >;
type MutableUpdateDto = {
  -readonly [K in keyof D.UpdateAttachFileDto]: D.UpdateAttachFileDto[K];
};
type UpdateDto = MutableUpdateDto &
  Partial<
    Pick<
      M.AttachFile,
      'type' | 'careApplicationId' | 'careGiverRegistrationId' | 'careGiverReviewId' | 'refusalId' | 'userId'
    >
  >;

const exclude = ['createdAt', 'updatedAt', 'deletedAt'];

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

  async updateByPathForSupervisor(
    req: I.RequestWithSupervisor,
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
            where: { path: from, supervisorId: req.supervisor.id },
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
          where: { path: fromPath, supervisorId: req.supervisor.id },
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
