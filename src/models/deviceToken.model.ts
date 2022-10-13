import { ApiProperty } from '@nestjs/swagger';
import { Column, BelongsTo, Model, Table, Default } from 'sequelize-typescript';

import * as I from '@interface/index';
import { User } from '@model/index';

@Table({
  tableName: 'DeviceToken',
  paranoid: true,
  timestamps: true,
  comment: '디바이스 토큰 관리 테이블',
})
export class DeviceToken extends Model<I.AttributesDeviceToken, Partial<I.AttributesDeviceToken>> {
  @ApiProperty()
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    unique: 'token',
    allowNull: false,
    comment: '디바이스 토큰',
  })
  token: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '디바이스 이름',
  })
  name: string;

  @ApiProperty()
  @Default(0)
  @Column({
    allowNull: false,
    comment: '로그인 횟수',
  })
  loginCount: number;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '유저 아이디',
  })
  userId: number;

  @ApiProperty()
  @Column
  createdAt: Date;

  @ApiProperty()
  @Column
  updatedAt: Date;

  @ApiProperty()
  @Column
  deletedAt: Date;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  user: User;
}
