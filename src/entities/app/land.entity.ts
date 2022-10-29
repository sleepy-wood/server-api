import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BridgeLand, User, LandDecoration, Tree } from '..';

@Entity()
export class Land {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'Unity Land Id',
  })
  unityLandId: number;

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

  @ApiProperty({ type: () => [LandDecoration] })
  @OneToMany(() => LandDecoration, (landDecoration) => landDecoration.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  landDecorations: LandDecoration[];

  @ApiProperty({ type: () => [Tree] })
  @OneToMany(() => Tree, (tree) => tree.land, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  trees: Tree[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.lands, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
