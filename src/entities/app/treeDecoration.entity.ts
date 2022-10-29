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

import { Tree, User } from '..';

@Entity()
export class TreeDecoration {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  treeId: number;

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
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => Tree })
  @ManyToOne(() => Tree, (tree) => tree.treeDecorations, {
    nullable: false,
  })
  @JoinColumn({ name: 'treeId' })
  tree: Tree;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.treeDecorations, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
