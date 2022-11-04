import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class WishlistService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Wishlist)
    private readonly wishlist: Repository<E.Wishlist>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateWishlistDto): Promise<E.Wishlist> {
    const wishlist = new E.Wishlist();
    const {} = body;

    return this.wishlist.save(wishlist).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Wishlist[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.wishlist
      .findAndCount({
        where: { deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Wishlist> {
    return this.wishlist.findOne({ where: { id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateWishlistDto): Promise<void> {
    const wishlist = new E.Wishlist();
    const {} = body;

    await this.wishlist.update(id, wishlist);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.wishlist.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
