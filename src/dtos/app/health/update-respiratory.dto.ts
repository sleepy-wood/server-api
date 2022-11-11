import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRespiratoryDto {
  @ApiProperty({
    example: 2,
    required: true,
    description: '분당 호흡수',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '분당 호흡수는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly valueInCountPerMinute: number;

  @ApiProperty({
    example: new Date(),
    required: true,
    description: '날짜',
  })
  @IsDateString({ strict: false }, { message: '날짜가 올바른 날짜 형식이 아니에요.' })
  @IsOptional()
  readonly date: Date;
}
