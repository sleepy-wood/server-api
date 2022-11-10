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

import { User } from '..';

@Entity()
export class Activity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 5,
    precision: 11,
    nullable: false,
    comment: '움직이기',
  })
  activeEnergyBurnedInKcal: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 5,
    precision: 11,
    nullable: false,
    comment: '움직이기 목표',
  })
  activeEnergyBurnedGoalInKcal: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '운동하기',
  })
  exerciseTimeInMinutes: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '운동하기 목표',
  })
  exerciseTimeGoalInMinutes: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '일어서기',
  })
  standHours: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '일어서기 목표',
  })
  standHoursGoal: number;

  @ApiProperty()
  @Column({
    type: 'date',
    nullable: false,
    comment: '일어서기 목표',
  })
  date: Date;

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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.activities, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
