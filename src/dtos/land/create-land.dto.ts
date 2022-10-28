import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLandDto {
  @ApiProperty({
    example: 1,
    required: true,
    description: 'Land Id',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'Land Id는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'Land Id는 필수 입력 항목이에요.' })
  readonly landId: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 좌표는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'x축 좌표는 필수 입력 항목이에요.' })
  readonly positionX: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 좌표는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'y축 좌표는 필수 입력 항목이에요.' })
  readonly positionY: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 좌표는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'z축 좌표는 필수 입력 항목이에요.' })
  readonly positionZ: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x축 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 크기는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'x축 크기는 필수 입력 항목이에요.' })
  readonly scaleX: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y축 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 크기는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'y축 크기는 필수 입력 항목이에요.' })
  readonly scaleY: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z축 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 크기는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'z축 크기는 필수 입력 항목이에요.' })
  readonly scaleZ: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x축 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 오일러 각도는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'x축 오일러 각도는 필수 입력 항목이에요.' })
  readonly eulerAngleX: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y축 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 오일러 각도는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'y축 오일러 각도는 필수 입력 항목이에요.' })
  readonly eulerAngleY: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z축 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 오일러 각도는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'z축 오일러 각도는 필수 입력 항목이에요.' })
  readonly eulerAngleZ: number;
}
