import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Bridge, Land } from '..';

@Entity()
export class BridgeLand {
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

  @ApiProperty({ type: () => Bridge })
  @ManyToOne(() => Bridge, (bridge) => bridge.bridgeLand, {
    nullable: false,
  })
  bridge: Bridge;

  @ApiProperty({ type: () => Land })
  @ManyToOne(() => Land, (land) => land.bridgeLand, {
    nullable: false,
  })
  land: Land;
}
