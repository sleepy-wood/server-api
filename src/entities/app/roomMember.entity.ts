import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Room, User } from '..';

@Entity()
export class RoomMember {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  userId: number;

  @ApiProperty()
  @Column({ nullable: false })
  roomId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => Room })
  @ManyToOne(() => Room, (room) => room.roomMembers, {
    nullable: false,
  })
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.roomMembers, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
