import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '..';

@Entity()
export class DeviceToken {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    comment: '디바이스 토큰',
  })
  token: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '디바이스 이름',
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '로그인 횟수',
  })
  loginCount: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '유저 아이디',
  })
  userId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.deviceToken, {
    nullable: false,
  })
  @JoinColumn()
  user: User;
}
