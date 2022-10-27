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
export class BridgeLandService {
  constructor(
    @InjectRepository(E.BridgeLand)
    private readonly bridgeLand: Repository<E.BridgeLand>,
  ) {}

  async create(context: I.RequestWithUser, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }

  async findAll(context: I.RequestWithUser, contextType: I.ContextType): Promise<any> {
    // this is intentional
  }

  async findOne(context: I.RequestWithUser, contextType: I.ContextType, id: number): Promise<any> {
    // this is intentional
  }

  async update(context: I.RequestWithUser, contextType: I.ContextType, id: number): Promise<any> {
    // this is intentional
  }

  async remove(context: I.RequestWithUser, contextType: I.ContextType, id: number): Promise<any> {
    // this is intentional
  }
}
