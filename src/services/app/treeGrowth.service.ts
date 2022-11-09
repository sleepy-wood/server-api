import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class TreeGrowthService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.TreeGrowth)
    private readonly treeGrowth: Repository<E.TreeGrowth>,
  ) {}

  async create(queryRunner: QueryRunner, treeId: number): Promise<E.TreeGrowth> {
    const treeGrowth = new E.TreeGrowth();

    treeGrowth.treeDay = 1;
    treeGrowth.treeId = treeId;

    return queryRunner.manager.save(E.TreeGrowth, treeGrowth).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
