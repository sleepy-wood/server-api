import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateOxygenDto {
  @ApiProperty({
    example: 2,
    required: true,
    description: '산소포화도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '산소포화도는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '산소포화도는 필수 입력 항목이에요.' })
  readonly valueInRatio: number;

  @ApiProperty({
    example: new Date(),
    required: true,
    description: '날짜',
  })
  @IsDateString({ strict: false }, { message: '날짜가 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '날짜는 필수 입력 항목이에요.' })
  readonly date: Date;
}
