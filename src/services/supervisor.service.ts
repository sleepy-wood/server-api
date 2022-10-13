import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import * as D from '@dto/index';
import * as I from '@interface/index';
import * as M from '@model/index';
import * as U from '@util/index';
import { HttpException } from '@exception/index';

const exclude = ['password', 'createdAt', 'updatedAt', 'deletedAt'];
const commonExclude = ['createdAt', 'updatedAt', 'deletedAt'];

@Injectable()
export class SupervisorService {
  constructor(
    @InjectModel(M.ConsultingMember)
    private readonly consultingMember: typeof M.ConsultingMember,
    @InjectModel(M.ConsultingRoom)
    private readonly consultingRoom: typeof M.ConsultingRoom,
    @InjectModel(M.Supervisor)
    private readonly supervisor: typeof M.Supervisor,
  ) {}

  async login(body: D.SupervisorLoginDto) {
    const supervisor = await this.supervisor
      .findOne({
        where: { name: body.name },
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    if (!U.compareHash(body.password, supervisor.password)) throw new HttpException('USER_VALIDATION');

    return supervisor;
  }

  async create(req: I.RequestWithSupervisor, body: D.CreateSupervisorDto): Promise<M.Supervisor> {
    if (!req.supervisor) throw new HttpException('NO_SUPERVISOR');
    if (!req.supervisor.root) throw new HttpException('NOT_ROOT_SUPERVISOR');

    body.password = U.generateHash(body.password);

    const supervisor = await this.supervisor
      .create(body, {
        transaction: req.transaction,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    const consultingRoom = await this.consultingRoom
      .create({ supervisorId: supervisor.id }, { transaction: req.transaction })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    await this.consultingMember
      .create(
        {
          isSupervisor: true,
          consultingRoomId: consultingRoom.id,
          supervisorId: supervisor.id,
        },
        { transaction: req.transaction },
      )
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    return supervisor;
  }

  async findAll(
    req: I.RequestWithSupervisor,
    query: D.ListSearchQuery,
  ): Promise<{ count: number; rows: M.Supervisor[] }> {
    if (!req.supervisor) throw new HttpException('NO_SUPERVISOR');
    if (!req.supervisor.root) throw new HttpException('NOT_ROOT_SUPERVISOR');

    return this.getSupervisors(req, query);
  }

  async findOne(req: I.RequestWithSupervisor, id: number): Promise<M.Supervisor> {
    if (!req.supervisor) throw new HttpException('NO_SUPERVISOR');
    if (!req.supervisor.root) throw new HttpException('NOT_ROOT_SUPERVISOR');

    const result = await this.supervisor
      .findByPk(id, {
        transaction: req.transaction,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    if (!result) throw new HttpException('NOT_FOUND_DATA');

    return result;
  }

  async findOneByToken(req: I.RequestWithSupervisor) {
    if (!req.supervisor) throw new HttpException('NO_SUPERVISOR');

    return this.supervisor.findByPk(req.supervisor.id, {
      attributes: { exclude },
      include: [
        { model: M.AttachFile, attributes: { exclude: commonExclude } },
        {
          model: M.ConsultingMember,
          attributes: { exclude: commonExclude },
          include: [{ model: M.ConsultingRoom, attributes: { exclude: commonExclude } }],
        },
      ],
      transaction: req.transaction,
    });
  }

  async update(req: I.RequestWithSupervisor, id: number, body: D.UpdateSupervisorDto): Promise<boolean> {
    if (!req.supervisor) throw new HttpException('NO_SUPERVISOR');
    if (!req.supervisor.root) throw new HttpException('NOT_ROOT_SUPERVISOR');

    const [affected] = await this.supervisor
      .update(body, {
        where: { id },
        transaction: req.transaction,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    return affected > 0;
  }

  async remove(req: I.RequestWithSupervisor, id: number): Promise<boolean> {
    if (!req.supervisor) throw new HttpException('NO_SUPERVISOR');
    if (!req.supervisor.root) throw new HttpException('NOT_ROOT_SUPERVISOR');

    const deleted = await this.supervisor
      .destroy({
        where: { id },
        transaction: req.transaction,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });

    return deleted > 0;
  }

  private async getSupervisors(
    req: I.RequestWithSupervisor,
    query: D.ListSearchQuery,
  ): Promise<{ count: number; rows: M.Supervisor[] }> {
    let { page, count, sort, dir, q } = query;
    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return await this.supervisor
      .findAndCountAll({
        where: { ...(q ? { name: { [Op.like]: `%${q}%` } } : {}) },
        limit: count,
        offset: (page - 1) * count,
        order: [[sort, dir]],
        transaction: req.transaction,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('SUPERVISOR_FAIL');
      });
  }
}
