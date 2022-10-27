import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

const exclude = ['deletedAt'];

@Injectable()
export class LandDecorationService {
  constructor(
    @InjectRepository(E.LandDecoration)
    private readonly landDecoration: Repository<E.LandDecoration>,
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
