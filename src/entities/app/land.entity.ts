import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { BridgeLand, User, LandDecoration } from '..';

@Entity()
export class Land {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.land, {
    nullable: false,
  })
  user: User;

  @ApiProperty({ type: () => [BridgeLand] })
  @OneToMany(() => BridgeLand, (bridgeLand) => bridgeLand.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  bridgeLand: BridgeLand[];

  @ApiProperty({ type: () => [LandDecoration] })
  @OneToMany(() => LandDecoration, (landDecoration) => landDecoration.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  landDecorations: LandDecoration[];
}
