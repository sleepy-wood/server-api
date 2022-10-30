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
  OneToOne,
} from 'typeorm';

import { BridgeInfo, User, LandDecoration, Tree } from '..';

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
  landPositionX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 좌표',
  })
  landPositionY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 좌표',
  })
  landPositionZ: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 크기',
  })
  landScaleX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 크기',
  })
  landScaleY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 크기',
  })
  landScaleZ: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'x 오일러 각도',
  })
  landEulerAngleX: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'y 오일러 각도',
  })
  landEulerAngleY: number;

  @ApiProperty()
  @Column({
    type: 'float',
    nullable: false,
    comment: 'z 오일러 각도',
  })
  landEulerAngleZ: number;

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

  @ApiProperty({ type: () => BridgeInfo })
  @OneToOne(() => BridgeInfo, (bridgeInfo) => bridgeInfo.fromLand, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  fromBridgeInfo: BridgeInfo;

  @ApiProperty({ type: () => BridgeInfo })
  @OneToOne(() => BridgeInfo, (bridgeInfo) => bridgeInfo.toLand, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  toBridgeInfo: BridgeInfo;

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
