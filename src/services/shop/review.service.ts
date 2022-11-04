import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class ReviewService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Review)
    private readonly review: Repository<E.Review>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateReviewDto): Promise<E.Review> {
    const review = new E.Review();
    const {} = body;

    return this.review.save(review).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Review[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.review
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Review> {
    return this.review.findOne({ where: { id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateReviewDto): Promise<void> {
    const review = new E.Review();
    const {} = body;

    await this.review.update(id, review);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.review.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
