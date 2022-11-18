import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as S from '../../services';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class WishlistService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => S.ProductService))
    private readonly productService: S.ProductService,
    @InjectRepository(E.Wishlist)
    private readonly wishlist: Repository<E.Wishlist>,
    @InjectRepository(E.WishlistItem)
    private readonly wishlistItem: Repository<E.WishlistItem>,
  ) {}

  async createWishlistItem(req: I.RequestWithUser, body: D.CreateWishlistItemDto): Promise<E.WishlistItem> {
    const wishlistItem = new E.WishlistItem();
    const { productId } = body;

    const [wishlist, product] = await Promise.all([
      this.wishlist.findOne({ where: { userId: req.user.id, deletedAt: null } }),
      this.productService.findOne(req, productId),
    ]).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    if (!product) {
      throw new HttpException('PRODUCT_NOT_FOUND');
    }

    wishlistItem.wishlistId = wishlist.id;
    wishlistItem.productId = productId;

    const item = await this.wishlistItem.save(wishlistItem).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    return this.wishlistItem.findOne({
      where: { id: item.id },
      relations: ['product', 'product.productImages', 'product.user'],
    });
  }

  async removeWishlistItem(req: I.RequestWithUser, body: D.DeleteWishlistItemDto): Promise<void> {
    const { productIds } = body;
    const wishlist = await this.wishlist.findOne({ where: { userId: req.user.id, deletedAt: null } });
    const wishlistItems = await this.wishlistItem
      .find({
        where: {
          productId: In(productIds),
          wishlistId: wishlist.id,
          deletedAt: null,
        },
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });

    if (productIds.length !== wishlistItems.length) {
      throw new HttpException('COMMON_ERROR');
    }

    await this.wishlistItem
      .softDelete({
        productId: In(productIds),
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Wishlist[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.wishlist
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Wishlist> {
    return this.wishlist.findOne({ where: { id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateWishlistItemDto): Promise<void> {
    const wishlist = new E.Wishlist();
    const {} = body;

    await this.wishlist.update(id, wishlist);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.wishlist.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
