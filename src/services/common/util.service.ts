import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class UtilService {
  constructor(
    @InjectRepository(E.Weather)
    private readonly weather: Repository<E.Weather>,
  ) {}

  async find(req: I.RequestWithUser): Promise<E.Weather[]> {
    return this.weather
      .find({
        order: { id: 'DESC' },
        take: 1,
      })
      .catch((reason) => {
        U.logger.error(reason);
        throw new HttpException('COMMON_ERROR');
      });
  }
}
