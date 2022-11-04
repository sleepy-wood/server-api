import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { Cart, OrderDetail, ProductImage, Review, Wishlist } from '..';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '상품 이름',
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '가격',
  })
  price: number;

  @ApiProperty()
  @Column({
    default: 0,
    nullable: false,
    comment: '할인율',
  })
  discount: number;

  @ApiProperty()
  @Column({
    default: 0,
    nullable: false,
    comment: '재고',
  })
  stock: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '상세정보',
  })
  detail: string;

  @ApiProperty()
  @Column({
    default: 0,
    nullable: false,
    comment: '조회수',
  })
  hit: number;

  @ApiProperty()
  @Column({
    default: 0,
    nullable: false,
    comment: '판매수',
  })
  sell: number;

  @ApiProperty()
  @Column({ nullable: false })
  cartId: number;

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

  @ApiProperty({ type: () => [OrderDetail] })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {
    nullable: false,
  })
  orderDetails: OrderDetail[];

  @ApiProperty({ type: () => [ProductImage] })
  @OneToMany(() => ProductImage, (productImages) => productImages.product, {
    nullable: false,
  })
  productImages: ProductImage[];

  @ApiProperty({ type: () => [Review] })
  @OneToMany(() => Review, (review) => review.product, {
    nullable: false,
  })
  reviews: Review[];

  @ApiProperty({ type: () => Cart })
  @ManyToOne(() => Cart, (cart) => cart.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ApiProperty({ type: () => Wishlist })
  @ManyToOne(() => Wishlist, (wishlist) => wishlist.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'wishlistId' })
  wishlist: Wishlist;
}
