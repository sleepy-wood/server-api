import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class TreePipelineService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.TreePipeline)
    private readonly treePipeline: Repository<E.TreePipeline>,
  ) {}

  async create(
    queryRunner: QueryRunner,
    treeGrowthId: number,
    body: D.CreateTreeDto | D.CreateTreeGrowthDto,
  ): Promise<E.TreePipeline> {
    const treePipeline = new E.TreePipeline();
    const {
      scale,
      branch1,
      branch2,
      branch3,
      branch4,
      trunkLength,
      sproutNum,
      rottenRate,
      gravity,
      rootNum,
      barkTexture,
      sproutIndex,
    } = body;

    treePipeline.scale = scale;
    treePipeline.branch1 = branch1;
    treePipeline.branch2 = branch2;
    treePipeline.branch3 = branch3;
    treePipeline.branch4 = branch4;
    treePipeline.trunkLength = trunkLength;
    treePipeline.sproutNum = sproutNum;
    treePipeline.rottenRate = rottenRate;
    treePipeline.gravity = gravity;
    treePipeline.rootNum = rootNum;
    treePipeline.barkTexture = barkTexture;
    treePipeline.sproutIndex = sproutIndex;
    treePipeline.treeGrowthId = treeGrowthId;

    return queryRunner.manager.save(E.TreePipeline, treePipeline).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
