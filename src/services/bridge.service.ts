import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as S from '../services';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class BridgeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Bridge)
    private readonly bridge: Repository<E.Bridge>,
    @Inject(forwardRef(() => S.BridgeInfoService))
    private readonly bridgeInfoService: S.BridgeInfoService,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateBridgeDto): Promise<E.Bridge> {
    const bridge = new E.Bridge();
    const {
      fromLandId,
      toLandId,
      name,
      bridgePositionX,
      bridgePositionY,
      bridgePositionZ,
      bridgeRotationX,
      bridgeRotationY,
      bridgeRotationZ,
    } = body;

    bridge.name = name;
    bridge.bridgePositionX = bridgePositionX;
    bridge.bridgePositionY = bridgePositionY;
    bridge.bridgePositionZ = bridgePositionZ;
    bridge.bridgeRotationX = bridgeRotationX;
    bridge.bridgeRotationY = bridgeRotationY;
    bridge.bridgeRotationZ = bridgeRotationZ;
    bridge.userId = req.user.id;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.save(E.Bridge, bridge);
      await this.bridgeInfoService.create(queryRunner, fromLandId, toLandId, result.id);
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
        relations: ['bridgeInfo'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Bridge> {
    return this.bridge
      .findOne({
        where: { id, userId: req.user.id, deletedAt: null },
        relations: ['bridgeInfo'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateBridgeDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');

    const bridge = new E.Bridge();
    const {
      name,
      bridgePositionX,
      bridgePositionY,
      bridgePositionZ,
      bridgeRotationX,
      bridgeRotationY,
      bridgeRotationZ,
    } = body;

    name && (bridge.name = name);
    bridgePositionX && (bridge.bridgePositionX = bridgePositionX);
    bridgePositionY && (bridge.bridgePositionY = bridgePositionY);
    bridgePositionZ && (bridge.bridgePositionZ = bridgePositionZ);
    bridgeRotationX && (bridge.bridgeRotationX = bridgeRotationX);
    bridgeRotationY && (bridge.bridgeRotationY = bridgeRotationY);
    bridgeRotationZ && (bridge.bridgeRotationZ = bridgeRotationZ);

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
