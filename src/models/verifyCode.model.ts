import { ApiProperty } from '@nestjs/swagger';
import { Column, BelongsTo, Model, Table, HasMany } from 'sequelize-typescript';

import * as I from '@interface/index';
import { User } from '@model/index';

@Table({
  tableName: 'VerifyToken',
  paranoid: true,
  timestamps: true,
  comment: '임시 생성 토큰',
})
export class VerifyToken extends Model<I.AttributesVerifyToken, Partial<I.AttributesVerifyToken>> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    comment: '코드',
  })
  code: number;

  @Column({
    allowNull: false,
    comment: '번호',
  })
  hp: string;

  @Column({
    comment: '유저타입',
  })
  type: number;

  @ApiProperty()
  @Column
  createdAt: Date;

  @ApiProperty()
  @Column
  updatedAt: Date;

  @ApiProperty()
  @Column
  deletedAt: Date;
}
