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

import { Land, TreeAttachment, TreeGrowth, User } from '..';

@Entity()
export class Tree {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나무 이름',
  })
  treeName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'seed 번호',
  })
  seedNumber: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나무 파이프라인 이름',
  })
  treePipeName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나무가지 Material 이름',
  })
  barkMaterial: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  sproutColor1: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  sproutColor2: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  sproutColor3: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  sproutColor4: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  sproutColor5: number;

  @ApiProperty()
  @Column({ nullable: true })
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

  @ApiProperty({ type: () => [TreeAttachment] })
  @OneToMany(() => TreeAttachment, (treeAttachments) => treeAttachments.tree, {
    nullable: true,
  })
  treeAttachments: TreeAttachment[];
}
