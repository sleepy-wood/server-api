import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

import * as I from '../../../interfaces';

export class CreateProductDto {
  @ApiProperty({
    example: '테스트 상품이름',
    required: true,
    description: '상품 이름',
  })
  @IsString({ message: '상품 이름은 문자열이어야 해요.' })
  @IsNotEmpty({ message: '상품 이름은 필수 입력 항목이에요.' })
  readonly name: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: '상품 가격',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '상품 가격은 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '상품 가격은 필수 입력 항목이에요.' })
  readonly price: number;

  @ApiProperty({
    enum: ['Emoticon', 'Prop'],
    example: 0,
    default: I.ProductType.Emoticon,
    required: true,
    description: '상품 유형',
  })
  @IsEnum(I.ProductType, { message: '상품 유형이 올바르지 않아요.' })
  @IsNotEmpty({ message: '상품 유형은 필수 입력 항목이에요.' })
  readonly type: keyof typeof I.ProductType;

  @ApiProperty({
    example: '테스트 상품이름',
    required: true,
    description: '상세정보',
  })
  @IsString({ message: '상세정보는 문자열이어야 해요.' })
  @IsNotEmpty({ message: '상세정보는 필수 입력 항목이에요.' })
  readonly detail: string;

  @ApiProperty({
    example: [1, 2],
    required: true,
    description: '첨부 파일 아이디',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: '첨부 파일 아이디는 숫자만 입력 가능해요.', each: true },
  )
  @IsNotEmpty({ message: '첨부 파일 아이디는 필수 입력 항목이에요.' })
  readonly attachFileIds: number[];
}
