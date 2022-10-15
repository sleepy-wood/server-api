import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import * as U from '../utils';
import { HttpException } from '../exceptions';

const exclude = ['password', 'createdAt', 'updatedAt', 'deletedAt'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(E.User)
    private readonly user: Repository<E.User>,
  ) {}

  create(createUserDto: D.CreateUserDto) {
    return 'This action adds a new giver';
  }

  findAll() {
    return `This action returns all giver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} giver`;
  }

  update(id: number, updateUserDto: D.UpdateUserDto) {
    return `This action updates a #${id} giver`;
  }

  remove(id: number) {
    return `This action removes a #${id} giver`;
  }

  async findOrCreate(id: number, userType: I.UserType): Promise<E.User> {
    const user = await this.user.findOne({ where: { id } });

    return user;
  }
}
