import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Product)
    private readonly product: Repository<E.Product>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateProductDto): Promise<E.Product> {
    const product = new E.Product();
    const {} = body;

    return this.product.save(product).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Product[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.product
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Product> {
    return this.product.findOne({ where: { id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateProductDto): Promise<void> {
    const product = new E.Product();
    const {} = body;

    await this.product.update(id, product);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.product.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
