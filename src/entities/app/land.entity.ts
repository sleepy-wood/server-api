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

import { Bridge, User, LandDecoration } from '..';

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

  @ApiProperty({ type: () => [Bridge] })
  @OneToMany(() => Bridge, (bridge) => bridge.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  bridges: Bridge[];

  @ApiProperty({ type: () => [LandDecoration] })
  @OneToMany(() => LandDecoration, (landDecoration) => landDecoration.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  landDecorations: LandDecoration[];
}
