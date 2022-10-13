import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import * as D from '@dto/index';
import * as I from '@interface/index';
import * as M from '@model/index';
import * as U from '@util/index';
import { HttpException } from '@exception/index';

const exclude = ['password', 'createdAt', 'updatedAt', 'deletedAt'];

@Injectable()
export class UserService {
  constructor(
    @InjectModel(M.User)
    private readonly user: typeof M.User,
  ) {}

  create(createUserDto: D.CreateUserDto) {
    return 'This action adds a new giver';
  }

  findAll() {
    return `This action returns all giver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} giver`;
  }

  update(id: number, updateUserDto: D.UpdateUserDto) {
    return `This action updates a #${id} giver`;
  }

  remove(id: number) {
    return `This action removes a #${id} giver`;
  }

  async findOrCreate(hp: string, userType: I.UserType): Promise<M.User> {
    const [user] = await this.user
      .findOrCreate({
        where: { hp },
        attributes: { exclude },
        defaults: {
          hp: hp,
          type: userType,
          status: I.UserStatus.Authorized,
        },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('USER_FAIL');
      });

    return user;
  }

  async findByHP(hp: string): Promise<M.User> {
    return this.user
      .findOne({
        where: { hp },
        attributes: { exclude },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('USER_FAIL');
      });
  }

  async countBySupervisor(req: I.RequestWithSupervisor): Promise<number> {
    if (!(req.supervisor instanceof M.Supervisor)) throw new HttpException('SUPERVISOR_VALIDATION');

    return this.user
      .count({
        where: {
          type: I.UserType.CareGiver,
          status: I.UserStatus.Authorized,
        },
        include: {
          model: M.CareGiverRegistration,
          where: {
            status: {
              [Op.or]: [
                I.CareGiverRegistration.STATUS.APPROVED,
                I.CareGiverRegistration.STATUS.PROFESSIONAL_APPROVED,
                I.CareGiverRegistration.STATUS.KOREAN_CHINESE,
              ],
            },
          },
        },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('USER_FAIL');
      });
  }
}
