import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Bridge, Land } from '..';

@Entity()
export class BridgeLand {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  bridgeId: number;

  @ApiProperty()
  @Column({ nullable: false })
  landId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => Bridge })
  @ManyToOne(() => Bridge, (bridge) => bridge.bridgeLand, {
    nullable: false,
  })
  @JoinColumn({ name: 'bridgeId' })
  bridge: Bridge;

  @ApiProperty({ type: () => Land })
  @ManyToOne(() => Land, (land) => land.bridgeLand, {
    nullable: false,
  })
  @JoinColumn({ name: 'landId' })
  land: Land;
}
