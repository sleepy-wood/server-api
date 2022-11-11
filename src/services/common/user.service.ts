import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.User)
    private readonly user: Repository<E.User>,
  ) {}

  async findOne(req: I.RequestWithUser): Promise<E.User> {
    return this.user
      .findOne({
        where: { id: req.user.id, deletedAt: null },
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findTrendingTen(): Promise<[E.User[], number]> {
    return this.user
      .findAndCount({
        where: { deletedAt: null },
        order: {
          products: { hit: 'desc' },
        },
        take: 10,
        relations: ['products'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findTopTen(): Promise<[E.User[], number]> {
    return this.user
      .findAndCount({
        where: { deletedAt: null },
        order: { productCount: 'desc' },
        take: 10,
        relations: ['products'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findFiveByCategory(): Promise<[E.User[], number]> {
    return this.user
      .findAndCount({
        where: { deletedAt: null },
        order: { productCount: 'desc' },
        take: 5,
        relations: ['products'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(req: I.RequestWithUser, body: D.UpdateUserDto): Promise<void> {
    const user = new E.User();
    const { avatar, profileImg, currentLandId } = body;

    avatar && (user.avatar = avatar);
    profileImg && (user.profileImg = profileImg);
    currentLandId && (user.currentLandId = currentLandId);

    await this.user.update(req.user.id, user).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
