import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class LandDecorationService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.LandDecoration)
    private readonly landDecoration: Repository<E.LandDecoration>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateLandDecorationDto): Promise<E.LandDecoration> {
    const landDecoration = new E.LandDecoration();

    const {
      path,
      localPositionX,
      localPositionY,
      localPositionZ,
      localScaleX,
      localScaleY,
      localScaleZ,
      localEulerAngleX,
      localEulerAngleY,
      localEulerAngleZ,
      landId,
    } = body;

    landDecoration.path = path;
    landDecoration.localPositionX = localPositionX;
    landDecoration.localPositionY = localPositionY;
    landDecoration.localPositionZ = localPositionZ;
    landDecoration.localScaleX = localScaleX;
    landDecoration.localScaleY = localScaleY;
    landDecoration.localScaleZ = localScaleZ;
    landDecoration.localEulerAngleX = localEulerAngleX;
    landDecoration.localEulerAngleY = localEulerAngleY;
    landDecoration.localEulerAngleZ = localEulerAngleZ;
    landDecoration.landId = landId;
    landDecoration.userId = req.user.id;

    return this.landDecoration.save(landDecoration).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.LandDecoration[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.landDecoration
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.LandDecoration> {
    return this.landDecoration.findOne({ where: { id, userId: req.user.id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateLandDecorationDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');

    const landDecoration = new E.LandDecoration();

    await this.landDecoration.update(id, landDecoration);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.landDecoration.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
