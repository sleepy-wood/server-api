import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class TreeDecorationService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.TreeDecoration)
    private readonly treeDecoration: Repository<E.TreeDecoration>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateTreeDecorationDto): Promise<E.TreeDecoration> {
    const treeDecoration = new E.TreeDecoration();

    return this.treeDecoration.save(treeDecoration).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.TreeDecoration[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.treeDecoration
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.TreeDecoration> {
    return this.treeDecoration.findOneBy({ id, deletedAt: null }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateTreeDecorationDto): Promise<void> {
    const treeDecoration = new E.TreeDecoration();

    await this.treeDecoration.update(id, treeDecoration);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.treeDecoration.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
