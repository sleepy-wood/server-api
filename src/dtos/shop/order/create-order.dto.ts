import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

import * as I from '../../../interfaces';

export class CreateOrderDto {
  @ApiProperty({
    example: 1000,
    required: true,
    description: '구매 금액',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '구매 금액은 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '구매 금액은 필수 입력 항목이에요.' })
  readonly amount: number;

  @ApiProperty({
    enum: I.Payment,
    example: 0,
    default: I.Payment.Cash,
    required: true,
    description: '결제 유형',
  })
  @IsEnum(I.Payment, { message: '결제 유형이 올바르지 않아요.' })
  @IsNotEmpty({ message: '결제 유형은 필수 입력 항목이에요.' })
  readonly payment: I.Payment;

  @ApiProperty({
    example: [1, 2],
    required: true,
    description: '상품 아이디',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: '상품 아이디는 숫자만 입력 가능해요.', each: true },
  )
  @IsNotEmpty({ message: '상품 아이디는 필수 입력 항목이에요.' })
  readonly productIds: number[];
}
