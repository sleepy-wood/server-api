import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class BridgeLandService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.BridgeLand)
    private readonly bridgeLand: Repository<E.BridgeLand>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateBridgeLandDto): Promise<E.BridgeLand> {
    const bridgeLand = new E.BridgeLand();

    return this.bridgeLand.save(bridgeLand).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async bulkCreate(queryRunner: QueryRunner, fromLandId: number, toLandId: number, bridgeId: number): Promise<void> {
    await queryRunner.manager
      .save(E.BridgeLand, [
        { bridgeId, landId: fromLandId },
        { bridgeId, landId: toLandId },
      ])
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.BridgeLand[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.bridgeLand
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

  async findOne(req: I.RequestWithUser, id: number): Promise<E.BridgeLand> {
    return this.bridgeLand.findOneBy({ id, deletedAt: null }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateBridgeLandDto): Promise<void> {
    const bridgeLand = new E.BridgeLand();

    await this.bridgeLand.update(id, bridgeLand);
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    await this.bridgeLand.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
