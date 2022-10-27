import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
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
    comment: 'Land Id',
  })
  landId: number;

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
    comment: 'x 크기',
  })
  scaleX: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'y 크기',
  })
  scaleY: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'z 크기',
  })
  scaleZ: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'x 오일러 각도',
  })
  eulerAngleX: number;

  @ApiProperty()
  @Column({
    nullable: false,
    comment: 'y 오일러 각도',
  })
  eulerAngleY: number;

  @ApiProperty()
  @Column({
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

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.land, {
    nullable: false,
  })
  user: User;

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
}
