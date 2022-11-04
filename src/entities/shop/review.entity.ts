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

import { Product, User } from '..';

@Entity()
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  productId: number;

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

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.reviews, {
    nullable: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.reviews, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
