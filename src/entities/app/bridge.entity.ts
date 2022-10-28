import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BridgeLand, User } from '..';

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
    type: 'float',
    nullable: false,
    comment: 'x 좌표',
  })
  positionX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 좌표',
  })
  positionY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 좌표',
  })
  positionZ: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 회전',
  })
  rotationX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 회전',
  })
  rotationY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 회전',
  })
  rotationZ: number;

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
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => [BridgeLand] })
  @OneToMany(() => BridgeLand, (bridgeLand) => bridgeLand.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  bridgeLand: BridgeLand[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.sleeps, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
