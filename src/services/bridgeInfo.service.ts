import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner, In } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

@Injectable()
export class BridgeInfoService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.BridgeInfo)
    private readonly bridgeLand: Repository<E.BridgeInfo>,
  ) {}

  async create(queryRunner: QueryRunner, fromLandId: number, toLandId: number, bridgeId: number): Promise<void> {
    await queryRunner.manager
      .save(E.BridgeInfo, {
        bridgeId,
        fromLandId,
        toLandId,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }
}
