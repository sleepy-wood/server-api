import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class TreeMinMaxService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.TreeMinMax)
    private readonly treeMinMax: Repository<E.TreeMinMax>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateTreeMinMaxDto): Promise<E.TreeMinMax> {
    const treeMinMax = new E.TreeMinMax();

    return this.treeMinMax.save(treeMinMax).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.TreeMinMax[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.treeMinMax
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.TreeMinMax> {
    return this.treeMinMax.findOneBy({ id, deletedAt: null }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateTreeMinMaxDto): Promise<void> {
    const treeMinMax = new E.TreeMinMax();

    await this.treeMinMax.update(id, treeMinMax);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.treeMinMax.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
