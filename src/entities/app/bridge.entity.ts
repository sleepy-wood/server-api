import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { BridgeInfo, User } from '..';

@Entity()
export class Bridge {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '다리 이름',
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: 'x 좌표',
  })
  bridgePositionX: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: 'y 좌표',
  })
  bridgePositionY: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: 'z 좌표',
  })
  bridgePositionZ: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: 'x 회전',
  })
  bridgeRotationX: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: 'y 회전',
  })
  bridgeRotationY: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: 'z 회전',
  })
  bridgeRotationZ: number;

  @ApiProperty()
  @Column({ nullable: false })
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

  @ApiProperty({ type: () => [BridgeInfo] })
  @OneToOne(() => BridgeInfo, (bridgeInfo) => bridgeInfo.bridge, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  bridgeInfo: BridgeInfo;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.sleeps, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
