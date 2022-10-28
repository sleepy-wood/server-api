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
    const { landId, positionX, positionY, positionZ, scaleX, scaleY, scaleZ, eulerAngleX, eulerAngleY, eulerAngleZ } =
      body;

    land.landId = landId;
    land.positionX = positionX;
    land.positionY = positionY;
    land.positionZ = positionZ;
    land.scaleX = scaleX;
    land.scaleY = scaleY;
    land.scaleZ = scaleZ;
    land.eulerAngleX = eulerAngleX;
    land.eulerAngleY = eulerAngleY;
    land.eulerAngleZ = eulerAngleZ;

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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Land> {
    return this.land.findOneBy({ id, deletedAt: null }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateLandDto): Promise<void> {
    const land = new E.Land();
    const { landId, positionX, positionY, positionZ, scaleX, scaleY, scaleZ, eulerAngleX, eulerAngleY, eulerAngleZ } =
      body;

    landId && (land.landId = landId);
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
    await this.land.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
