import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class TreeFlatFrequencyService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.TreeFlatFrequency)
    private readonly treeFlatFrequency: Repository<E.TreeFlatFrequency>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateTreeFlatFrequencyDto): Promise<E.TreeFlatFrequency> {
    const treeFlatFrequency = new E.TreeFlatFrequency();

    return this.treeFlatFrequency.save(treeFlatFrequency).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.TreeFlatFrequency[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.treeFlatFrequency
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.TreeFlatFrequency> {
    return this.treeFlatFrequency.findOne({ where: { id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateTreeFlatFrequencyDto): Promise<void> {
    const treeFlatFrequency = new E.TreeFlatFrequency();

    await this.treeFlatFrequency.update(id, treeFlatFrequency);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.treeFlatFrequency.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
