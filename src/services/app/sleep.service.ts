import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class SleepService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Sleep)
    private readonly sleep: Repository<E.Sleep>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateSleepDto): Promise<E.Sleep> {
    const sleep = new E.Sleep();
    const { startDate, endDate, type } = body;

    sleep.startDate = startDate;
    sleep.endDate = endDate;
    sleep.type = type;
    sleep.userId = req.user.id;

    return this.sleep.save(sleep).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Sleep[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.sleep
      .findAndCount({
        where: { userId: req.user.id, deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Sleep> {
    return this.sleep.findOne({ where: { id, userId: req.user.id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateSleepDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data) throw new HttpException('INVALID_REQUEST');

    const sleep = new E.Sleep();
    const { startDate, endDate, type } = body;

    startDate && (sleep.startDate = startDate);
    endDate && (sleep.endDate = endDate);
    type && (sleep.type = type);

    await this.sleep.update(id, sleep);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.sleep.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
