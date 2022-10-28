import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TreeFlatFrequency } from '..';

@Entity()
export class TreeMinMax {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '요소 빈도 최소',
  })
  min: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '요소 빈도 최대',
  })
  max: number;

  @ApiProperty()
  @Column({ nullable: false })
  treeFlatFrequencyId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => TreeFlatFrequency })
  @ManyToOne(() => TreeFlatFrequency, (treeFlatFrequency) => treeFlatFrequency.treeMinMaxes, {
    nullable: false,
  })
  @JoinColumn({ name: 'treeFlatFrequencyId' })
  treeFlatFrequency: TreeFlatFrequency;
}
