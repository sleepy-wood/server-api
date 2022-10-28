import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class BridgeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Bridge)
    private readonly bridge: Repository<E.Bridge>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateBridgeDto): Promise<E.Bridge> {
    const bridge = new E.Bridge();
    const { name, positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = body;

    bridge.name = name;
    bridge.positionX = positionX;
    bridge.positionY = positionY;
    bridge.positionZ = positionZ;
    bridge.rotationX = rotationX;
    bridge.rotationY = rotationY;
    bridge.rotationZ = rotationZ;
    bridge.userId = req.user.id;

    return this.bridge.save(bridge).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Bridge[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.bridge
      .findAndCount({
        where: { userId: req.user.id, deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['bridgeLand', 'bridgeLand.land'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Bridge> {
    return this.bridge.findOneBy({ id, userId: req.user.id, deletedAt: null }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateBridgeDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');

    const bridge = new E.Bridge();
    const { name, positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = body;

    name && (bridge.name = name);
    positionX && (bridge.positionX = positionX);
    positionY && (bridge.positionY = positionY);
    positionZ && (bridge.positionZ = positionZ);
    rotationX && (bridge.rotationX = rotationX);
    rotationY && (bridge.rotationY = rotationY);
    rotationZ && (bridge.rotationZ = rotationZ);

    await this.bridge.update(id, bridge);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.bridge.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
