import { ApiProperty } from '@nestjs/swagger';
import { Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TreeMinMax } from '..';

@Entity()
export class treeFlatFrequency {
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
    nullable: false,
    comment: '나무 기둥 길이',
  })
  rootBaseLength: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나무 두께',
  })
  girthBase: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '나무 크기',
  })
  scale: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  treeMinMaxes: TreeMinMax[];
}
