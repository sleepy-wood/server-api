import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateLandDto {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Land Id',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'Land Id는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly landId?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'x축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 좌표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly positionX?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'y축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 좌표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly positionY?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'z축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 좌표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly positionZ?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'x축 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 크기는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly scaleX?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'y축 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 크기는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly scaleY?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'z축 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 크기는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly scaleZ?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'x축 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 오일러 각도는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly eulerAngleX?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'y축 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 오일러 각도는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly eulerAngleY?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'z축 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 오일러 각도는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly eulerAngleZ?: number;
}
