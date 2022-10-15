import { Injectable } from '@nestjs/common';

import * as D from '../dtos';
import * as I from '../interfaces';
import * as M from '../entities';
import * as U from '../utils';
import { HttpException } from '../exceptions';

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
}
