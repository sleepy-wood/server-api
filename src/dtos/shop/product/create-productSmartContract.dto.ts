import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductSmartContractDto {
  @ApiProperty({
    example: '0x1234567890',
    required: true,
    description: 'contract address',
  })
  @IsString({ message: 'contract address는 문자열이어야 해요.' })
  @IsNotEmpty({ message: 'contract address는 필수 입력 항목이에요.' })
  readonly address: string;

  @ApiProperty({
    required: true,
    description: 'contract abi',
  })
  @IsNotEmpty({ message: 'contract abi는 필수 입력 항목이에요.' })
  readonly abi: any;

  @ApiProperty({
    example: 1,
    required: true,
    description: '상품 아이디',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: '상품 아이디는 숫자만 입력 가능해요.' },
  )
  @IsNotEmpty({ message: '상품 아이디는 필수 입력 항목이에요.' })
  readonly productId: number;
}
