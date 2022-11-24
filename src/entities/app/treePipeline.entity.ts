import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { TreeGrowth } from '..';

@Entity()
export class TreePipeline {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: '나무 scale',
  })
  scale: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '나무 가지 개수 1',
  })
  branch1: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '나무 가지 개수 2',
  })
  branch2: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '나무 가지 개수 3',
  })
  branch3: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '나무 가지 개수 4',
  })
  branch4: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '나뭇잎 개수',
  })
  sproutNum: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: '나뭇잎 썩은 비율',
  })
  rottenRate: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: '나뭇잎 너비',
  })
  sproutWidth: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: '중력',
  })
  gravity: number;

  @ApiProperty()
  @Column({ nullable: false })
  treeGrowthId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => TreeGrowth })
  @OneToOne(() => TreeGrowth, (treeGrowth) => treeGrowth.treePipeline, {
    nullable: false,
  })
  @JoinColumn({ name: 'treeGrowthId' })
  treeGrowth: TreeGrowth;
}
