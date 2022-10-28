import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
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
    comment: 'x 크기',
  })
  scaleX: number;

  @ApiProperty()
  @Column({
    type: 'float',

    nullable: false,
    comment: 'y 크기',
  })
  scaleY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 크기',
  })
  scaleZ: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 오일러 각도',
  })
  eulerAngleX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 오일러 각도',
  })
  eulerAngleY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 오일러 각도',
  })
  eulerAngleZ: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ApiProperty({ type: () => Land })
  @ManyToOne(() => Land, (land) => land.landDecorations, {
    nullable: true,
  })
  land: Land;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.landDecorations, {
    nullable: false,
  })
  user: User;
}
