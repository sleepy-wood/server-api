import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class RespiratoryService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Respiratory)
    private readonly respiratory: Repository<E.Respiratory>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateRespiratoryDto): Promise<E.Respiratory> {
    const respiratory = new E.Respiratory();
    const { valueInCountPerMinute, date } = body;

    respiratory.valueInCountPerMinute = valueInCountPerMinute;
    respiratory.date = date;
    respiratory.userId = req.user.id;

    return this.respiratory.save(respiratory).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Respiratory[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.respiratory
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Respiratory> {
    return this.respiratory.findOne({ where: { id, userId: req.user.id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateRespiratoryDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data) throw new HttpException('INVALID_REQUEST');

    const respiratory = new E.Respiratory();
    const { valueInCountPerMinute, date } = body;

    valueInCountPerMinute && (respiratory.valueInCountPerMinute = valueInCountPerMinute);
    date && (respiratory.date = date);

    await this.respiratory.update(id, respiratory).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.respiratory.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
