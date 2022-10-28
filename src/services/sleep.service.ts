import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

const exclude = ['deletedAt'];

@Injectable()
export class SleepService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Sleep)
    private readonly sleep: Repository<E.Sleep>,
  ) {}

  async create(context: I.RequestWithUser, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }

  async findAll(context: I.RequestWithUser, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }

  async findOne(context: I.RequestWithUser, id: number, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }

  async update(context: I.RequestWithUser, id: number, body: any, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }

  async remove(context: I.RequestWithUser, id: number, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }
}
