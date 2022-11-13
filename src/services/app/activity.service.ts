import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class ActivityService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Activity)
    private readonly activity: Repository<E.Activity>,
  ) {}

  async create(req: I.RequestWithUser, body: D.CreateActivityDto): Promise<E.Activity> {
    const activity = new E.Activity();
    const {
      activeEnergyBurnedInKcal,
      activeEnergyBurnedGoalInKcal,
      exerciseTimeInMinutes,
      exerciseTimeGoalInMinutes,
      standHours,
      standHoursGoal,
      date,
    } = body;

    activity.activeEnergyBurnedInKcal = activeEnergyBurnedInKcal;
    activity.activeEnergyBurnedGoalInKcal = activeEnergyBurnedGoalInKcal;
    activity.exerciseTimeInMinutes = exerciseTimeInMinutes;
    activity.exerciseTimeGoalInMinutes = exerciseTimeGoalInMinutes;
    activity.standHours = standHours;
    activity.standHoursGoal = standHoursGoal;
    activity.date = date;
    activity.userId = req.user.id;

    return this.activity.save(activity).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findAll(req: I.RequestWithUser, query: D.ListQuery): Promise<[E.Activity[], number]> {
    let { page, count, sort, dir, q } = query;

    page = Number(page) || 1;
    count = Number(count) || 30;
    sort = sort || 'createdAt';
    dir = dir || 'DESC';

    return this.activity
      .findAndCount({
        where: { userId: req.user.id, deletedAt: null },
        order: { [sort]: dir },
        skip: (page - 1) * count,
        take: count,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findWeekData(req: I.RequestWithUser): Promise<E.Activity[]> {
    return this.activity
      .find({
        where: { userId: req.user.id, deletedAt: null },
        order: { date: 'DESC' },
        take: 7,
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }

  async findOne(req: I.RequestWithUser, id: number): Promise<E.Activity> {
    return this.activity.findOne({ where: { id, userId: req.user.id, deletedAt: null } }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async update(req: I.RequestWithUser, id: number, body: D.UpdateActivityDto): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data) throw new HttpException('INVALID_REQUEST');

    const activity = new E.Activity();
    const {
      activeEnergyBurnedInKcal,
      activeEnergyBurnedGoalInKcal,
      exerciseTimeInMinutes,
      exerciseTimeGoalInMinutes,
      standHours,
      standHoursGoal,
      date,
    } = body;

    activeEnergyBurnedInKcal && (activity.activeEnergyBurnedInKcal = activeEnergyBurnedInKcal);
    activeEnergyBurnedGoalInKcal && (activity.activeEnergyBurnedGoalInKcal = activeEnergyBurnedGoalInKcal);
    exerciseTimeInMinutes && (activity.exerciseTimeInMinutes = exerciseTimeInMinutes);
    exerciseTimeGoalInMinutes && (activity.exerciseTimeGoalInMinutes = exerciseTimeGoalInMinutes);
    standHours && (activity.standHours = standHours);
    standHoursGoal && (activity.standHoursGoal = standHoursGoal);
    date && (activity.date = date);

    await this.activity.update(id, activity).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async remove(req: I.RequestWithUser, id: number): Promise<void> {
    const data = await this.findOne(req, id);
    if (!data || data.userId !== req.user.id) throw new HttpException('INVALID_REQUEST');
    await this.activity.softDelete(id).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }
}
