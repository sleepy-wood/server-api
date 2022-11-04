import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Order, Product } from '..';

@Entity()
export class OrderDetail {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  orderId: number;

  @ApiProperty()
  @Column({ nullable: false })
  productId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.orderDetails, {
    nullable: false,
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.orderDetails, {
    nullable: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
