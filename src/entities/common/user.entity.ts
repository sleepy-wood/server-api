import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { randomBytes } from 'crypto';

import * as I from '../../interfaces';
import * as U from '../../utils';
import { AttachFile, DeviceToken } from '..';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: true,
    comment: '유저 프로필 이미지',
  })
  profileImg: string;

  @ApiProperty()
  @Column({
    default: I.UserType.None,
    type: 'enum',
    enum: [...U.getObjectValues(I.UserType)],
    nullable: false,
    comment: '유저 타입',
  })
  type: keyof typeof I.UserType;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: true,
    comment: '유저 닉네임',
  })
  nickname: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '전체 뱃지 카운트',
  })
  badgeCount: number;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    comment: '전화번호',
  })
  hp: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => [AttachFile] })
  @OneToMany(() => AttachFile, (attachFile) => attachFile.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  attachFiles: AttachFile[];

  @ApiProperty({ type: () => [DeviceToken] })
  @OneToOne(() => DeviceToken, (deviceToken) => deviceToken.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  deviceToken: DeviceToken[];
}
