import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Land, TreeGrowth, User } from '..';

@Entity()
export class Tree {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    comment: '나무 이름',
  })
  treeName: string;

  @ApiProperty()
  @Column({
    comment: 'seed 번호',
  })
  seedNumber: number;

  @ApiProperty()
  @Column({
    comment: '나무 종류',
  })
  seedType: string;

  @ApiProperty()
  @Column({ nullable: false })
  landId: number;

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

  @ApiProperty({ type: () => Land })
  @ManyToOne(() => Land, (land) => land.trees, {
    nullable: false,
  })
  @JoinColumn({ name: 'landId' })
  land: Land;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.trees, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ type: () => TreeGrowth })
  @OneToMany(() => TreeGrowth, (treeGrowth) => treeGrowth.tree, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  treeGrowths: TreeGrowth[];
}
