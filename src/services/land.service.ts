import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class LandService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Land)
    private readonly land: Repository<E.Land>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateLandDto): Promise<E.Land> {
    const land = new E.Land();
    const {
      unityLandId,
      positionX,
      positionY,
      positionZ,
      scaleX,
      scaleY,
      scaleZ,
      eulerAngleX,
      eulerAngleY,
      eulerAngleZ,
    } = body;

    land.unityLandId = unityLandId;
    land.positionX = positionX;
    land.positionY = positionY;
    land.positionZ = positionZ;
    land.scaleX = scaleX;
    land.scaleY = scaleY;
    land.scaleZ = scaleZ;
    land.eulerAngleX = eulerAngleX;
    land.eulerAngleY = eulerAngleY;
    land.eulerAngleZ = eulerAngleZ;
    land.userId = req.user.id;

    return this.land.save(land).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Land[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.land
      .findAndCount({
        where: { userId: req.user.id, deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['bridgeLand', 'bridgeLand.bridge'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Land> {
    return this.land
      .findOne({
        where: { id, userId: req.user.id, deletedAt: null },
        relations: ['bridgeLand', 'bridgeLand.bridge'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateLandDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');

    const land = new E.Land();
    const {
      unityLandId,
      positionX,
      positionY,
      positionZ,
      scaleX,
      scaleY,
      scaleZ,
      eulerAngleX,
      eulerAngleY,
      eulerAngleZ,
    } = body;

    unityLandId && (land.unityLandId = unityLandId);
    positionX && (land.positionX = positionX);
    positionY && (land.positionY = positionY);
    positionZ && (land.positionZ = positionZ);
    scaleX && (land.scaleX = scaleX);
    scaleY && (land.scaleY = scaleY);
    scaleZ && (land.scaleZ = scaleZ);
    eulerAngleX && (land.eulerAngleX = eulerAngleX);
    eulerAngleY && (land.eulerAngleY = eulerAngleY);
    eulerAngleZ && (land.eulerAngleZ = eulerAngleZ);

    await this.land.update(id, land);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.land.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
