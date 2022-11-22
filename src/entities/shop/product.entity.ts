import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import * as I from '../../interfaces';
import { CartItem, OrderDetail, ProductImage, ProductSmartContract, Review, User, WishlistItem } from '..';

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
    type: 'decimal',
    scale: 16,
    precision: 22,
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
    type: 'text',
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
  @Column({
    type: 'enum',
    enum: I.ProductCategory,
    default: I.ProductCategory.emoticon,
    nullable: false,
    comment: '상품 카테고리',
  })
  category: I.ProductCategory;

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

  @ApiProperty({ type: () => ProductSmartContract })
  @OneToOne(() => ProductSmartContract, (productSmartContract) => productSmartContract.product, {
    nullable: true,
  })
  productSmartContract: ProductSmartContract[];

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

  @ApiProperty({ type: () => [CartItem] })
  @OneToMany(() => CartItem, (cartItem) => cartItem.product, {
    nullable: false,
  })
  cartItems: CartItem[];

  @ApiProperty({ type: () => [WishlistItem] })
  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.product, {
    nullable: false,
  })
  wishlistItems: WishlistItem[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
