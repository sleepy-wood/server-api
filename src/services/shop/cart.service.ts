import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class CartService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Cart)
    private readonly cart: Repository<E.Cart>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateCartDto): Promise<E.Cart> {
    const cart = new E.Cart();
    const {} = body;

    return this.cart.save(cart).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Cart[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.cart
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Cart> {
    return this.cart.findOne({ where: { id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateCartDto): Promise<void> {
    const cart = new E.Cart();
    const {} = body;

    await this.cart.update(id, cart);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.cart.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
