import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';

@Injectable()
export class RoomService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(E.Room)
    private readonly room: Repository<E.Room>,
    @InjectRepository(E.RoomMember)
    private readonly roomMember: Repository<E.RoomMember>,
  ) {}

  async enterRoom(req: I.RequestWithUser, roomId: number, body: D.CreateRoomMemberDto): Promise<E.RoomMember> {
    const roomMember = new E.RoomMember();
    const { userId } = body;

    roomMember.roomId = roomId;
    roomMember.userId = userId;

    return this.roomMember.save(roomMember).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async leaveRoom(req: I.RequestWithUser, roomId: number, roomMemberId: number): Promise<void> {
    await this.roomMember.delete({ id: roomMemberId, roomId: roomId }).catch((err) => {
      U.logger.error(err);
      throw new HttpException('COMMON_ERROR');
    });
  }

  async findOne(req: I.RequestWithUser, roomId: number): Promise<E.Room> {
    return this.room
      .findOne({
        where: { id: roomId, deletedAt: null },
        relations: ['roomMembers', 'roomMembers.user'],
      })
      .catch((err) => {
        U.logger.error(err);
        throw new HttpException('COMMON_ERROR');
      });
  }
}
