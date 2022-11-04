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

import { Product, Wishlist } from '..';

@Entity()
export class WishlistItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  productId: number;

  @ApiProperty()
  @Column({ nullable: false })
  wishlistId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => Wishlist })
  @ManyToOne(() => Wishlist, (wishlist) => wishlist.wishlistItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'wishlistId' })
  wishlist: Wishlist;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.wishlistItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
