import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import * as I from '../interfaces';
import * as U from '../utils';
import { User } from '.';

@Entity()
export class AttachFile {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '생성된 파일이름',
  })
  filename: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '원래 파일이름',
  })
  originalName: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    comment: '경로',
  })
  path: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '마임 타입',
  })
  mimeType: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '파일 사이즈',
  })
  size: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: [...U.getObjectKeys(I.AttachFileType)],
    default: I.AttachFileType.Temp,
    nullable: false,
    comment: '파일 타입(Temp | Static | Secure)',
  })
  type: keyof typeof I.AttachFileType;

  @ApiProperty()
  @Column({
    comment: '유저아이디',
  })
  userId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.attachFiles, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
