import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Order)
    private readonly order: Repository<E.Order>,
    @InjectRepository(E.OrderDetail)
    private readonly orderDetail: Repository<E.OrderDetail>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateOrderDto): Promise<E.Order> {
    const order = new E.Order();
    const { amount, payment, productIds } = body;

    order.amount = amount;
    order.payment = payment;
    order.userId = req.user.id;

    const result = await this.order.save(order).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    const saveData: E.OrderDetail[] = [];
    for (const productId of productIds) {
      const orderDetail = new E.OrderDetail();
      orderDetail.orderId = result.id;
      orderDetail.productId = productId;

      saveData.push(orderDetail);
    }

    await this.orderDetail.save(saveData).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    return result;
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Order[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.order
      .findAndCount({
        where: { deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['orderDetails', 'orderDetails.product', 'orderDetails.product.productImages'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Order> {
    return this.order
      .findOne({
        where: { id, userId: req.user.id, deletedAt: null },
        relations: ['orderDetails', 'orderDetails.product', 'orderDetails.product.productImages'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateOrderDto): Promise<void> {
    const order = new E.Order();
    const {} = body;

    await this.order.update(id, order);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.order.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
