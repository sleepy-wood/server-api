import { ApiProperty } from '@nestjs/swagger';
import { Column, BelongsTo, Model, Table, Default } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import * as I from '@interface/index';
import * as U from '@util/index';
import { CareApplication, CareGiverRegistration, CareGiverReview, Refusal, Supervisor, User } from '@model/index';

@Table({
  tableName: 'AttachFile',
  paranoid: true,
  timestamps: true,
  comment: '첨부파일',
})
export class AttachFile extends Model<I.AttributesAttachFile, Partial<I.AttributesAttachFile>> {
  @ApiProperty()
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '파일이름',
  })
  fileName: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '원래이름',
  })
  originalName: string;

  @ApiProperty()
  @Column({
    unique: 'path',
    allowNull: false,
    comment: '경로',
  })
  path: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '마임 타입',
  })
  mimeType: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '파일 사이즈',
  })
  size: number;

  @ApiProperty()
  @Column({
    comment: '어디와 관련있는 파일인가요',
  })
  property: I.AttachFileProperty;

  @ApiProperty()
  @Default(I.AttachFileType.Temp)
  @Column({
    type: DataTypes.ENUM(...U.getObjectKeys(I.AttachFileType)),
    allowNull: false,
    comment: '파일 타입(Temp | Static | Secure)',
  })
  type: keyof typeof I.AttachFileType;

  @ApiProperty()
  @Column({
    comment: '돌봄신청서 아이디',
  })
  careApplicationId: number;

  @ApiProperty()
  @Column({
    comment: '간병인 신청등록서 아이디',
  })
  careGiverRegistrationId: number;

  @ApiProperty()
  @Column({
    comment: '간병인 평가 아이디',
  })
  careGiverReviewId: number;

  @ApiProperty()
  @Column({
    comment: '관리자 거절 사유 아이디',
  })
  refusalId: number;

  @ApiProperty()
  @Column({
    comment: '관리자 아이디',
  })
  supervisorId: number;

  @ApiProperty()
  @Column({
    comment: '유저아이디',
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

  @ApiProperty({ type: () => CareApplication })
  @BelongsTo(() => CareApplication, {
    foreignKey: 'careApplicationId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  careApplication: CareApplication;

  @ApiProperty({ type: () => CareGiverRegistration })
  @BelongsTo(() => CareGiverRegistration, {
    foreignKey: 'careGiverRegistrationId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  careGiverRegistration: CareGiverRegistration;

  @ApiProperty({ type: () => CareGiverReview })
  @BelongsTo(() => CareGiverReview, {
    foreignKey: 'careGiverReviewId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  careGiverReview: CareGiverReview;

  @ApiProperty({ type: () => Refusal })
  @BelongsTo(() => Refusal, {
    foreignKey: 'refusalId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  refusal: Refusal;

  @ApiProperty({ type: () => Supervisor })
  @BelongsTo(() => Supervisor, {
    foreignKey: 'supervisorId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  supervisor: Supervisor;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, {
    foreignKey: 'userId',
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
  user: User;
}
