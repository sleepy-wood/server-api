import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Tree, TreeMinMax } from '..';

@Entity()
export class TreeFlatFrequency {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '가지 수',
  })
  rootFrequency: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: '나무 기둥 길이',
  })
  rootBaseLength: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: '나무 두께',
  })
  girthBase: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: '나무 크기',
  })
  scale: number;

  @ApiProperty()
  @Column({ nullable: false })
  treeId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => Tree })
  @OneToOne(() => Tree, (tree) => tree.treeFlatFrequency, {
    nullable: false,
  })
  tree: Tree;

  @ApiProperty({ type: () => [TreeMinMax] })
  @OneToMany(() => TreeMinMax, (treeMinMax) => treeMinMax.treeFlatFrequency, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  treeMinMaxes: TreeMinMax[];
}
