import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWishlistItemDto {
  @ApiProperty({
    example: 1,
    required: true,
    description: '상품 아이디',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '상품 아이디는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '상품 아이디는 필수 입력 항목이에요.' })
  readonly productId: number;
}
