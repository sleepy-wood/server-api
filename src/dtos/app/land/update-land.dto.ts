import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateLandDto {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Unity Land Id',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'Land Id는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly unityLandId?: number;

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
  readonly landPositionX?: number;

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
  readonly landPositionY?: number;

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
  readonly landPositionZ?: number;

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
  readonly landScaleX?: number;

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
  readonly landScaleY?: number;

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
  readonly landScaleZ?: number;

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
  readonly landEulerAngleX?: number;

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
  readonly landEulerAngleY?: number;

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
  readonly landEulerAngleZ?: number;
}
