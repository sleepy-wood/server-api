import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as S from '../../services';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class CartService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => S.ProductService))
    private readonly productService: S.ProductService,
    @InjectRepository(E.Cart)
    private readonly cart: Repository<E.Cart>,
    @InjectRepository(E.CartItem)
    private readonly cartItem: Repository<E.CartItem>,
  ) {}

  async createCartItem(req: I.RequestWithUser, body: D.CreateCartItemDto): Promise<E.CartItem> {
    const cartItem = new E.CartItem();
    const { productId } = body;

    const [cart, product] = await Promise.all([
      this.cart.findOne({ where: { userId: req.user.id, deletedAt: null } }),
      this.productService.findOne(req, productId),
    ]).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    if (!product) {
      throw new HttpException('PRODUCT_NOT_FOUND');
    }

    cartItem.cartId = cart.id;
    cartItem.productId = productId;

    const item = await this.cartItem.save(cartItem).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    return this.cartItem.findOne({
      where: { id: item.id },
      relations: ['product', 'product.productImages', 'product.user'],
    });
  }

  async removeCartItem(req: I.RequestWithUser, body: D.DeleteCartItemDto): Promise<void> {
    const { productIds } = body;
    const cart = await this.cart.findOne({ where: { userId: req.user.id, deletedAt: null } });
    const cartItems = await this.cartItem
      .find({
        where: {
          productId: In(productIds),
          cartId: cart.id,
          deletedAt: null,
        },
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });

    if (productIds.length !== cartItems.length) {
      throw new HttpException('COMMON_ERROR');
    }

    await this.cartItem
      .softDelete({
        productId: In(productIds),
      })
      .catch((err) => {
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

  async update(req: I.RequestWithUser, id: number, body: D.UpdateCartItemDto): Promise<void> {
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
