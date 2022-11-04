import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Product, User } from '..';

@Entity()
export class Cart {
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

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.cart, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ type: () => [Product] })
  @OneToMany(() => Product, (product) => product.cart, {
    nullable: false,
  })
  products: Product[];
}
