import { ApiProperty } from '@nestjs/swagger';
import { Column, Default, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { randomBytes } from 'crypto';

import * as I from '@interface/index';
import * as U from '@util/index';
import {
  AttachFile,
  CareApplication,
  CareGiverRegistration,
  CareGiverReview,
  Chat,
  ChatMember,
  ConsultingChat,
  ConsultingMember,
  DeviceToken,
} from '@model/index';

@Table({
  tableName: 'User',
  paranoid: true,
  timestamps: true,
  comment: '유저 테이블',
})
export class User extends Model<I.AttributesUser, Partial<I.AttributesUser>> {
  @ApiProperty()
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    allowNull: true,
    comment: '유저 프로필 이미지',
  })
  profileImg: string;

  @Default(I.UserType.NoType)
  @ApiProperty()
  @Column({
    type: DataTypes.ENUM(...U.getObjectValues(I.UserType)),
    allowNull: false,
    comment: '유저 타입',
  })
  type: keyof typeof I.UserType;

  @Default(I.Gender.Woman)
  @ApiProperty()
  @Column({
    type: DataTypes.ENUM(...U.getObjectValues(I.Gender)),
    allowNull: false,
    comment: '유저 성별',
  })
  gender: keyof typeof I.Gender;

  @ApiProperty()
  @Column({
    unique: 'nickname',
    allowNull: true,
    comment: '유저 닉네임',
  })
  nickname: string;

  @Default(`손님${randomBytes(4).toString('hex')}`)
  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '유저 이름',
  })
  name: string;

  @ApiProperty()
  @Column({
    allowNull: true,
    defaultValue: 0,
    comment: '전체 뱃지 카운트',
  })
  badgeCount: number;

  @ApiProperty()
  @Column({
    unique: 'hp',
    allowNull: true,
    comment: '전화번호',
  })
  hp: string;

  @ApiProperty()
  @Column
  password: string;

  @ApiProperty()
  @Column({
    type: DataTypes.ENUM(...U.getObjectValues(I.UserStatus)),
    comment: `${I.UserStatus.UnAuthorized}: 미인증, ${I.UserStatus.Authorized}: 인증, ${I.UserStatus.AuthRequired}: 추가인증필요`,
  })
  status: keyof typeof I.UserStatus;

  @ApiProperty()
  @Column
  createdAt: Date;

  @ApiProperty()
  @Column
  updatedAt: Date;

  @ApiProperty()
  @Column
  deletedAt: Date;

  @ApiProperty({ type: () => CareGiverRegistration })
  @HasOne(() => CareGiverRegistration, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  careGiverRegistration: CareGiverRegistration;

  @ApiProperty({ type: () => [AttachFile] })
  @HasMany(() => AttachFile, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  attachFile: AttachFile[];

  @ApiProperty({ type: () => [CareApplication] })
  @HasMany(() => CareApplication, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  careApplication: CareApplication[];

  @ApiProperty({ type: () => [CareGiverReview] })
  @HasMany(() => CareGiverReview, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  careGiverReview: CareGiverReview[];

  @ApiProperty({ type: () => [Chat] })
  @HasMany(() => Chat, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  chat: Chat[];

  @ApiProperty({ type: () => [ChatMember] })
  @HasMany(() => ChatMember, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  chatMember: ChatMember[];

  @ApiProperty({ type: () => [ConsultingChat] })
  @HasMany(() => ConsultingChat, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  consultingChat: ConsultingChat[];

  @ApiProperty({ type: () => [ConsultingMember] })
  @HasMany(() => ConsultingMember, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  consultingMember: ConsultingMember[];

  @ApiProperty({ type: () => [DeviceToken] })
  @HasMany(() => DeviceToken, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  deviceToken: DeviceToken[];
}
