import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import * as I from '../../interfaces';
import * as U from '../../utils';
import { OrderDetail, User } from '..';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    default: 0,
    type: 'decimal',
    scale: 16,
    precision: 22,
    nullable: false,
    comment: '구매 금액',
  })
  amount: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    default: I.Payment.Cash,
    enum: I.Payment,
    nullable: false,
    comment: '결제 유형',
  })
  payment: I.Payment;

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

  @ApiProperty({ type: () => [OrderDetail] })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    nullable: false,
  })
  orderDetails: OrderDetail[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
