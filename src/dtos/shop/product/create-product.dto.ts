import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  // @ApiProperty()
  // @Column({
  //   nullable: false,
  //   comment: '상품 이름',
  // })
  // name: string;
  // @ApiProperty()
  // @Column({
  //   nullable: false,
  //   comment: '가격',
  // })
  // price: number;
  // @ApiProperty()
  // @Column({
  //   default: 0,
  //   nullable: false,
  //   comment: '재고',
  // })
  // stock: number;
  // @ApiProperty()
  // @Column({
  //   nullable: false,
  //   comment: '상세정보',
  // })
  // detail: string;
}
