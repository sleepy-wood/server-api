import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Product, User } from '..';

@Entity()
export class Wishlist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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
  @OneToOne(() => User, (user) => user.wishlist, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ type: () => [Product] })
  @OneToMany(() => Product, (product) => product.wishlist, {
    nullable: false,
  })
  products: Product[];
}
