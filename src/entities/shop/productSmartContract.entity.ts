import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from '..';

@Entity()
export class ProductSmartContract {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'contract address',
  })
  address: string;

  @ApiProperty()
  @Column({
    type: 'longtext',
    nullable: false,
    comment: 'contract abi',
  })
  abi: string;

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

  @ApiProperty({ type: () => Product })
  @OneToOne(() => Product, (product) => product.productSmartContract, {
    nullable: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
