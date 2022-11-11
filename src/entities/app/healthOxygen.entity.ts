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
export class Oxygen {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    scale: 2,
    precision: 5,
    nullable: false,
    comment: '산소포화도',
  })
  valueInRatio: number;

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
  @ManyToOne(() => User, (user) => user.oxygen, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
