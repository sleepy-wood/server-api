import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as S from '..';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class TreeGrowthService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => S.TreeService))
    private readonly treeService: S.TreeService,
    @Inject(forwardRef(() => S.TreePipelineService))
    private readonly treePipelineService: S.TreePipelineService,
    @Inject(forwardRef(() => S.SleepService))
    private readonly sleepService: S.SleepService,
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

  async grow(req: I.RequestWithUser, body: D.CreateTreeGrowthDto): Promise<E.TreeGrowth> {
    const { treeId, rarity, vitality } = body;
    const treeGrowth = new E.TreeGrowth();

    const tree = await this.treeService.findOne(req, treeId);
    if (!tree) {
      throw new HttpException('TREE_GROWTH_NOT_FOUND');
    }

    const sleeps = await this.sleepService.findAllRecent(req);
    const sleepIds = sleeps.map((e) => e.id);

    treeGrowth.treeDay = tree.treeGrowths[tree.treeGrowths.length - 1].treeDay + 1;
    treeGrowth.treeId = treeId;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.save(E.TreeGrowth, treeGrowth);
      const treePipeline = await this.treePipelineService.create(queryRunner, result.id, body);

      await queryRunner.manager.update(E.Sleep, sleepIds, { treeGrowthId: treeGrowth.id });
      if (result.treeDay === 5) {
        await queryRunner.manager.update(E.Tree, treeId, {
          rarity,
          vitality,
        });
      }

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
}
