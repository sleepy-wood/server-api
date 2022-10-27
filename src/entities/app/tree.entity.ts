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
} from 'typeorm';

import { Land, TreeDecoration, User } from '..';

@Entity()
export class Tree {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    comment: '나무 이름',
  })
  name: string;

  @ApiProperty()
  @Column({
    comment: '나무 성장일',
  })
  treeDay: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => [TreeDecoration] })
  @OneToMany(() => TreeDecoration, (treeDecoration) => treeDecoration.tree, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  treeDecorations: TreeDecoration[];

  @ApiProperty({ type: () => Land })
  @ManyToOne(() => Land, (land) => land.trees, {
    nullable: false,
  })
  land: Land;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.trees, {
    nullable: false,
  })
  user: User;
}
