import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Sleep, Tree, TreePipeline } from '..';

@Entity()
export class TreeGrowth {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나무 성장일',
  })
  treeDay: number;

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

  @ApiProperty({ type: () => TreePipeline })
  @OneToOne(() => TreePipeline, (treePipeline) => treePipeline.treeGrowth, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  treePipeline: TreePipeline;

  @ApiProperty({ type: () => Tree })
  @ManyToOne(() => Tree, (tree) => tree.treeGrowths, {
    nullable: false,
  })
  @JoinColumn({ name: 'treeId' })
  tree: Tree;

  @ApiProperty({ type: () => [Sleep] })
  @OneToMany(() => Sleep, (sleeps) => sleeps.treeGrowth, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  sleeps: Sleep[];
}
