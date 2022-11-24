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
} from 'typeorm';

import { Tree } from '..';

@Entity()
export class TreeAttachment {
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
    nullable: false,
    default: false,
    comment: '대표 이미지 여부',
  })
  isThumbnail: boolean;

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
  @ManyToOne(() => Tree, (tree) => tree.treeAttachments, {
    nullable: false,
  })
  @JoinColumn({ name: 'treeId' })
  tree: Tree;
}
