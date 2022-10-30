import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Land, User } from '..';

@Entity()
export class LandDecoration {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: '파일 경로',
  })
  path: string;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 좌표',
  })
  localPositionX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 좌표',
  })
  localPositionY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 좌표',
  })
  localPositionZ: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 크기',
  })
  localScaleX: number;

  @ApiProperty()
  @Column({
    type: 'float',

    nullable: false,
    comment: 'y 크기',
  })
  localScaleY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 크기',
  })
  localScaleZ: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 오일러 각도',
  })
  localEulerAngleX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 오일러 각도',
  })
  localEulerAngleY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 오일러 각도',
  })
  localEulerAngleZ: number;

  @ApiProperty()
  @Column({ nullable: false })
  landId: number;

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

  @ApiProperty({ type: () => Land })
  @ManyToOne(() => Land, (land) => land.landDecorations, {
    nullable: true,
  })
  @JoinColumn({ name: 'landId' })
  land: Land;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.landDecorations, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
