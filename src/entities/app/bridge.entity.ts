import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { BridgeLand } from '..';

@Entity()
export class Bridge {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '다리 이름',
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'x 좌표',
  })
  positionX: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'y 좌표',
  })
  positionY: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'z 좌표',
  })
  positionZ: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'x 회전',
  })
  rotationX: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'y 회전',
  })
  rotationY: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'z 회전',
  })
  rotationZ: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => [BridgeLand] })
  @OneToMany(() => BridgeLand, (bridgeLand) => bridgeLand.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  bridgeLand: BridgeLand[];
}
