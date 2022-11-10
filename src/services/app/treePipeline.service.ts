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
    @InjectRepository(E.Tree)
    private readonly tree: Repository<E.Tree>,
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

  async findOne(req: I.RequestWithUser, treeId: number, pipelineId: number): Promise<E.Tree> {
    return this.tree
      .findOne({
        where: {
          id: treeId,
          userId: req.user.id,
          treeGrowths: {
            treePipeline: { id: pipelineId },
          },
        },
        relations: ['treeGrowths', 'treeGrowths.treePipeline'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(
    req: I.RequestWithUser,
    treeId: number,
    pipelineId: number,
    body: D.UpdateTreePipelineDto,
  ): Promise<void> {
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

    const data = await this.findOne(req, treeId, pipelineId);
    if (!data) throw new HttpException('INVALID_REQUEST');

    scale && (treePipeline.scale = scale);
    branch1 && (treePipeline.branch1 = branch1);
    branch2 && (treePipeline.branch2 = branch2);
    branch3 && (treePipeline.branch3 = branch3);
    branch4 && (treePipeline.branch4 = branch4);
    trunkLength && (treePipeline.trunkLength = trunkLength);
    sproutNum && (treePipeline.sproutNum = sproutNum);
    rottenRate && (treePipeline.rottenRate = rottenRate);
    gravity && (treePipeline.gravity = gravity);
    rootNum && (treePipeline.rootNum = rootNum);
    barkTexture && (treePipeline.barkTexture = barkTexture);
    sproutIndex && (treePipeline.sproutIndex = sproutIndex);

    await this.treePipeline.update(pipelineId, treePipeline).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
