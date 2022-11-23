import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as S from '..';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class TreeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.AttachFile)
    private readonly attachFile: Repository<E.AttachFile>,
    @InjectRepository(E.TreeAttachment)
    private readonly treeAttachment: Repository<E.TreeAttachment>,
    @InjectRepository(E.Tree)
    private readonly tree: Repository<E.Tree>,
    @Inject(forwardRef(() => S.TreeGrowthService))
    private readonly treeGrowthService: S.TreeGrowthService,
    @Inject(forwardRef(() => S.TreePipelineService))
    private readonly treePipelineService: S.TreePipelineService,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateTreeDto): Promise<E.Tree> {
    const tree = new E.Tree();
    const {
      treeName,
      seedNumber,
      treePipeName,
      barkMaterial,
      sproutGroupId,
      sproutColor1,
      sproutColor2,
      sproutColor3,
      sproutColor4,
      sproutColor5,
      rarity,
      vitality,
      landId,
    } = body;

    tree.treeName = treeName;
    tree.seedNumber = seedNumber;
    tree.treePipeName = treePipeName;
    tree.barkMaterial = barkMaterial;
    tree.sproutGroupId = sproutGroupId;
    tree.sproutColor1 = sproutColor1;
    tree.sproutColor2 = sproutColor2;
    tree.sproutColor3 = sproutColor3;
    tree.sproutColor4 = sproutColor4;
    tree.sproutColor5 = sproutColor5;
    tree.rarity = rarity;
    tree.vitality = vitality;
    tree.landId = landId;
    tree.userId = req.user.id;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.save(E.Tree, tree);
      const treeGrowth = await this.treeGrowthService.create(queryRunner, result.id);
      const treePipeline = await this.treePipelineService.create(queryRunner, treeGrowth.id, body);
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

  async createTreeAttachments(req: I.RequestWithUser, body: D.CreateTreeAttachmentDto): Promise<E.TreeAttachment[]> {
    const { treeId, attachFileIds } = body;

    const tree = await this.findOne(req, treeId);
    if (!tree || tree.treeGrowths.filter((e) => e.treeDay === 5).length === 0)
      throw new HttpException('INVALID_REQUEST');

    const attachFiles = await this.attachFile.find({ where: { id: In(attachFileIds) } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });

    const saveData: E.TreeAttachment[] = [];
    for (const _attachFile of attachFiles) {
      const treeAttachment = new E.TreeAttachment();
      const { filename, originalName, path: from, mimeType, size, type } = _attachFile;
      const serverTo = from.replace('/temp/', '/static/');
      const clientTo = from.replace('/temp/', '/resources/');

      U.moveFile(from, serverTo);

      treeAttachment.filename = filename;
      treeAttachment.originalName = originalName;
      treeAttachment.path = clientTo;
      treeAttachment.mimeType = mimeType;
      treeAttachment.size = size;
      treeAttachment.treeId = treeId;

      if (mimeType.includes('image')) {
        treeAttachment.isThumbnail = true;
      }

      saveData.push(treeAttachment);
    }

    return this.treeAttachment.save(saveData).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAllOther(req: I.RequestWithUser, query: D.ListQuery, userId: number): Promise<[E.Tree[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.tree
      .findAndCount({
        where: { userId, deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['treeGrowths', 'treeGrowths.treePipeline'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findAllMine(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Tree[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.tree
      .findAndCount({
        where: { userId: req.user.id, deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['treeGrowths', 'treeGrowths.treePipeline'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findAllCollection(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Tree[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.tree
      .findAndCount({
        where: {
          userId: req.user.id,
          treeGrowths: {
            treeDay: 5,
          },
          deletedAt: null,
        },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
        relations: ['treeGrowths', 'treeGrowths.treePipeline', 'treeAttachments', 'product'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Tree> {
    return this.tree
      .findOne({
        where: { id, deletedAt: null },
        relations: ['treeGrowths', 'treeGrowths.treePipeline', 'treeAttachments', 'product'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateTreeDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data) throw new HttpException('INVALID_REQUEST');

    const tree = new E.Tree();
    const {
      treeName,
      seedNumber,
      treePipeName,
      barkMaterial,
      sproutGroupId,
      sproutColor1,
      sproutColor2,
      sproutColor3,
      sproutColor4,
      sproutColor5,
      landId,
    } = body;

    treeName && (tree.treeName = treeName);
    seedNumber && (tree.seedNumber = seedNumber);
    treePipeName && (tree.treePipeName = treePipeName);
    barkMaterial && (tree.barkMaterial = barkMaterial);
    sproutGroupId && (tree.sproutGroupId = sproutGroupId);
    sproutColor1 && (tree.sproutColor1 = sproutColor1);
    sproutColor2 && (tree.sproutColor2 = sproutColor2);
    sproutColor3 && (tree.sproutColor3 = sproutColor3);
    sproutColor4 && (tree.sproutColor4 = sproutColor4);
    sproutColor5 && (tree.sproutColor5 = sproutColor5);
    landId && (tree.landId = landId);

    await this.tree.update(id, tree).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.tree.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
