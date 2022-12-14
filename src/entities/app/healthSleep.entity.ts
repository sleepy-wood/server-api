import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import * as I from '../../interfaces';
import { User, TreeGrowth } from '..';

@Entity()
export class Sleep {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'timestamp', comment: '잠든 시간' })
  startDate: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', comment: '깨어난 시간' })
  endDate: Date;

  @ApiProperty()
  @Column({
    default: I.SleepType.InBed,
    type: 'enum',
    enum: I.SleepType,
    nullable: false,
    comment: '수면 타입',
  })
  type: I.SleepType;

  @ApiProperty()
  @Column({ nullable: true })
  treeGrowthId: number;

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

  @ApiProperty({ type: () => TreeGrowth })
  @ManyToOne(() => TreeGrowth, (treeGrowth) => treeGrowth.sleeps, {
    nullable: true,
  })
  @JoinColumn({ name: 'treeGrowthId' })
  treeGrowth: TreeGrowth;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.sleeps, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
