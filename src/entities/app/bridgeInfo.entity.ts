import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';

import { Bridge, Land } from '..';

@Entity()
export class BridgeInfo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  bridgeId: number;

  @ApiProperty()
  @Column({ nullable: false })
  fromLandId: number;

  @ApiProperty()
  @Column({ nullable: false })
  toLandId: number;

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
  @OneToOne(() => Bridge, (bridge) => bridge.bridgeInfo, {
    nullable: false,
  })
  @JoinColumn({ name: 'bridgeId' })
  bridge: Bridge;

  @ApiProperty({ type: () => Land })
  @OneToOne(() => Land, (land) => land.fromBridgeInfo, {
    nullable: false,
  })
  @JoinColumn({ name: 'fromLandId' })
  fromLand: Land;

  @ApiProperty({ type: () => Land })
  @OneToOne(() => Land, (land) => land.toBridgeInfo, {
    nullable: false,
  })
  @JoinColumn({ name: 'toLandId' })
  toLand: Land;
}
