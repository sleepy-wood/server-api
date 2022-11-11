import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '..';

@Entity()
export class Respiratory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 3,
    precision: 6,
    nullable: false,
    comment: '분당 호흡수',
  })
  valueInCountPerMinute: number;

  @ApiProperty()
  @Column({
    type: 'date',
    nullable: false,
    comment: '날짜',
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
  @ManyToOne(() => User, (user) => user.respiratory, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
