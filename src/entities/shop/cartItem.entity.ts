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

import { Cart, Product } from '..';

@Entity()
export class CartItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  cartId: number;

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

  @ApiProperty({ type: () => Cart })
  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.cartItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
