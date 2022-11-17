import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import * as I from '../../interfaces';
import * as U from '../../utils';
import {
  AttachFile,
  Bridge,
  DeviceToken,
  Land,
  LandDecoration,
  Activity,
  Heart,
  Oxygen,
  Respiratory,
  Sleep,
  Tree,
  Cart,
  Order,
  Product,
  Review,
  Room,
  RoomMember,
  Wishlist,
} from '..';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: true,
    comment: '유저 프로필 이미지',
  })
  profileImg: string;

  @ApiProperty()
  @Column({
    nullable: true,
    comment: '유저 배너 이미지',
  })
  bannerImg: string;

  @ApiProperty()
  @Column({
    default: I.UserType.None,
    type: 'enum',
    enum: I.UserType,
    nullable: false,
    comment: '유저 타입',
  })
  type: I.UserType;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: true,
    comment: '유저 닉네임',
  })
  nickname: string;

  @ApiProperty()
  @Column({
    nullable: true,
    comment: '유저 아바타',
  })
  avatar: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '전체 뱃지 카운트',
  })
  badgeCount: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '에셋 조회 카운트',
  })
  productHitCount: number;

  @ApiProperty()
  @Column({
    nullable: false,
    default: 0,
    comment: '에셋 판매 등록 카운트',
  })
  productCount: number;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
    comment: '전화번호',
  })
  hp: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column({
    nullable: true,
    comment: '현재 사용자가 위치 해있는 랜드 아이디',
  })
  currentLandId: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;

  @ApiProperty({ type: () => DeviceToken })
  @OneToOne(() => DeviceToken, (deviceToken) => deviceToken.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  deviceToken: DeviceToken;

  @ApiProperty({ type: () => [Bridge] })
  @OneToMany(() => Bridge, (bridge) => bridge.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  bridges: Bridge[];

  @ApiProperty({ type: () => [Land] })
  @OneToMany(() => Land, (land) => land.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  lands: Land[];

  @ApiProperty({ type: () => [AttachFile] })
  @OneToMany(() => AttachFile, (attachFile) => attachFile.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  attachFiles: AttachFile[];

  @ApiProperty({ type: () => [LandDecoration] })
  @OneToMany(() => LandDecoration, (landDecoration) => landDecoration.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  landDecorations: LandDecoration[];

  @ApiProperty({ type: () => [Activity] })
  @OneToMany(() => Activity, (activity) => activity.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  activities: Activity[];

  @ApiProperty({ type: () => [Heart] })
  @OneToMany(() => Heart, (heart) => heart.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  heart: Heart[];

  @ApiProperty({ type: () => [Oxygen] })
  @OneToMany(() => Oxygen, (oxygen) => oxygen.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  oxygen: Oxygen[];

  @ApiProperty({ type: () => [Respiratory] })
  @OneToMany(() => Respiratory, (respiratory) => respiratory.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  respiratory: Respiratory[];

  @ApiProperty({ type: () => [Sleep] })
  @OneToMany(() => Sleep, (sleep) => sleep.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  sleeps: Sleep[];

  @ApiProperty({ type: () => [Tree] })
  @OneToMany(() => Tree, (tree) => tree.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  trees: Tree[];

  @ApiProperty({ type: () => Cart })
  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @ApiProperty({ type: () => Wishlist })
  @OneToOne(() => Wishlist, (wishlist) => wishlist.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  wishlist: Wishlist;

  @ApiProperty({ type: () => Room })
  @OneToOne(() => Room, (room) => room.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  room: Room;

  @ApiProperty({ type: () => [RoomMember] })
  @OneToMany(() => RoomMember, (roomMembers) => roomMembers.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  roomMembers: RoomMember[];

  @ApiProperty({ type: () => [Order] })
  @OneToMany(() => Order, (orders) => orders.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  orders: Order[];

  @ApiProperty({ type: () => [Product] })
  @OneToMany(() => Product, (products) => products.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  products: Product[];

  @ApiProperty({ type: () => [Review] })
  @OneToMany(() => Review, (reviews) => reviews.user, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  reviews: Review[];
}
