import sharp from 'sharp';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, Not, Like } from 'typeorm';
import { path } from 'app-root-path';
import { join } from 'path';

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
    @InjectRepository(E.ProductImage)
    private readonly productImage: Repository<E.ProductImage>,
    @InjectRepository(E.ProductSmartContract)
    private readonly productSmartContract: Repository<E.ProductSmartContract>,
    @InjectRepository(E.AttachFile)
    private readonly attachFile: Repository<E.AttachFile>,
    @InjectRepository(E.User)
    private readonly user: Repository<E.User>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateProductDto): Promise<E.Product> {
    const product = new E.Product();
    const { name, price, category, detail, attachFileIds } = body;

    product.name = name;
    product.price = price;
    product.category = category;
    product.detail = detail;
    product.userId = req.user.id;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.save(E.Product, product);

      if (result.price < req.user.productMinPrice) {
        await queryRunner.manager.update(E.User, req.user.id, { productMinPrice: result.price });
      }

      const attachFiles = await this.attachFile.find({ where: { id: In(attachFileIds) } }).catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });

      if (attachFiles && attachFiles.length) {
        const saveData: E.ProductImage[] = [];
        for (const _attachFile of attachFiles) {
          const productImage = new E.ProductImage();
          const { filename, originalName, path: from, mimeType, size, type } = _attachFile;
          const serverTo = from.replace('/temp/', '/static/');
          const clientTo = from.replace('/temp/', '/resources/');

          U.moveFile(from, serverTo);

          productImage.filename = filename;
          productImage.originalName = originalName;
          productImage.path = clientTo;
          productImage.mimeType = mimeType;
          productImage.size = size;
          productImage.productId = result.id;

          if (result.category === I.ProductCategory.emoticon) {
            productImage.isThumbnail = true;
            const source = join(path, 'uploads', serverTo);
            let i = 1;
            for (const left of [0, 480, 960, 1440]) {
              for (const top of [0, 480, 960]) {
                const serverPath = source.replace('.png', `_${i}.png`);
                const clientPath = clientTo.replace('.png', `_${i}.png`);
                await sharp(source).extract({ left, top, width: 480, height: 480 }).toFile(serverPath);

                const _productImage = new E.ProductImage();

                _productImage.filename = filename;
                _productImage.originalName = originalName;
                _productImage.path = clientPath;
                _productImage.mimeType = mimeType;
                _productImage.size = size;
                _productImage.productId = result.id;
                _productImage.isThumbnail = false;

                saveData.push(_productImage);

                i++;
              }
            }
          } else {
            if (mimeType.includes('image')) {
              productImage.isThumbnail = true;
            }
          }

          saveData.push(productImage);
        }

        const productImages = await queryRunner.manager.save(E.ProductImage, saveData);
        result.productImages = productImages;
      }

      await queryRunner.manager.update(E.User, req.user.id, {
        productCount: req.user.productCount + 1,
      });

      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      U.logger.error(err);
      throw new HttpException('TRANSACTION_ERROR');
    } finally {
      await queryRunner.release();
    }
  }

  async createSmartContract(
    req: I.RequestWithUser,
    body: D.CreateProductSmartContractDto,
  ): Promise<E.ProductSmartContract> {
    const productSmartContract = new E.ProductSmartContract();
    const { productId, tokenId, address, abi } = body;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      productSmartContract.productId = productId;
      productSmartContract.address = address;
      productSmartContract.abi = JSON.stringify(abi);

      const result = await queryRunner.manager.save(E.ProductSmartContract, productSmartContract);
      await queryRunner.manager.update(E.Product, productId, { tokenId });
      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      U.logger.error(err);
      throw new HttpException('TRANSACTION_ERROR');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(req: I.RequestWithUser, query: D.FindProductDto): Promise<[E.Product[], number]> {
    let { page, count, sort, dir, q, category } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';
    category = category || I.ProductCategory.emoticon;

    return this.product
      .findAndCount({
        where: {
          category,
          deletedAt: null,
        },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['productImages', 'user'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findAllByUserId(req: I.RequestWithUser, userId: number): Promise<[E.Product[], number]> {
    const page = 1;
    const count = 30;
    const sort = 'createdAt';
    const dir = 'DESC';

    return this.product
      .findAndCount({
        where: {
          userId,
          deletedAt: null,
        },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['productImages'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findFiveByCategory(): Promise<[E.User[][], any[]]> {
    const _data = await Promise.all([
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.collection })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.emoticon })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.flower })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.plants })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.mushroom })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.rock })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.wooden })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
      this.product
        .createQueryBuilder('product')
        .select('DISTINCT product.userId')
        .where('product.category = :category', { category: I.ProductCategory.light })
        .orderBy({ 'product.createdAt': 'DESC' })
        .take(5)
        .getRawMany(),
    ]);

    const categoryCount = await this.product
      .createQueryBuilder('product')
      .select('product.category, COUNT(1) as categoryCount')
      .groupBy('product.category')
      .getRawMany();

    const option = [];
    for (const __data of _data) {
      option.push({
        where: { id: In(__data.map((d) => d.userId)) },
        order: { updatedAt: 'DESC' },
      });
    }

    const temp = await Promise.all([
      this.user.find(option[0]),
      this.user.find(option[1]),
      this.user.find(option[2]),
      this.user.find(option[3]),
      this.user.find(option[4]),
      this.user.find(option[5]),
      this.user.find(option[6]),
      this.user.find(option[7]),
    ]);

    return [temp, categoryCount];
  }

  async findFiveByQuery(query: string): Promise<[E.Product[], number][]> {
    const result = await Promise.all([
      this.product.findAndCount({
        where: {
          name: Like(`%${query}%`),
          category: I.ProductCategory.collection,
          deletedAt: null,
        },
        relations: ['productImages', 'user'],
        order: { createdAt: 'DESC' },
        take: 5,
      }),
      this.product.findAndCount({
        where: {
          name: Like(`%${query}%`),
          category: I.ProductCategory.emoticon,
          deletedAt: null,
        },
        relations: ['productImages', 'user'],
        order: { createdAt: 'DESC' },
        take: 5,
      }),
      this.product.findAndCount({
        where: {
          name: Like(`%${query}%`),
          category: Not(In([I.ProductCategory.collection, I.ProductCategory.emoticon])),
          deletedAt: null,
        },
        relations: ['productImages', 'user'],
        order: { createdAt: 'DESC' },
        take: 30,
      }),
    ]);

    return result;
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Product> {
    return this.product
      .findOne({
        where: { id, deletedAt: null },
        relations: ['productImages', 'productSmartContract', 'user'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findFourExtraProducts(id: number): Promise<E.Product[]> {
    const product = await this.product
      .findOne({
        where: { id, deletedAt: null },
        relations: ['user'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });

    return this.product
      .find({
        where: {
          id: Not(id),
          userId: product.user.id,
          deletedAt: null,
        },
        order: { createdAt: 'DESC' },
        relations: ['productImages'],
        take: 5,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findFourRecommendProducts(id: number): Promise<E.Product[]> {
    const product = await this.product
      .findOne({
        where: { id, deletedAt: null },
        relations: ['user'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });

    return this.product
      .find({
        where: {
          id: Not(id),
          userId: Not(product.user.id),
          category: product.category,
          deletedAt: null,
        },
        order: { createdAt: 'DESC' },
        relations: ['productImages'],
        take: 5,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateProductDto): Promise<void> {
    const product = new E.Product();
    const {} = body;

    await this.product.update(
      {
        id,
        userId: req.user.id,
      },
      product,
    );
  }

  async updateHitPlusOne(req: I.RequestWithUser, id: number): Promise<void> {
    const product = await this.product
      .findOne({
        where: { id, deletedAt: null },
        relations: ['user'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        queryRunner.manager.update(E.User, product.user.id, {
          productHitCount: product.user.productHitCount + 1,
        }),
        queryRunner.manager.update(E.Product, id, {
          hit: product.hit + 1,
        }),
      ]);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      U.logger.error(err);
      throw new HttpException('TRANSACTION_ERROR');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.product
      .softDelete({
        id,
        userId: req.user.id,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }
}
