import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Tree, User } from '..';

@Entity()
export class TreeDecoration {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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
  tree: Tree;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.treeDecorations, {
    nullable: false,
  })
  user: User;
}
