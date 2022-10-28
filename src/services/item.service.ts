import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class ItemService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Item)
    private readonly item: Repository<E.Item>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateItemDto): Promise<E.Item> {
    const item = new E.Item();
    const {} = body;

    return this.item.save(item).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Item[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.item
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Item> {
    return this.item.findOneBy({ id, deletedAt: null }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateItemDto): Promise<void> {
    const item = new E.Item();
    const {} = body;

    await this.item.update(id, item);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.item.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
