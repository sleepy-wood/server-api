import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateLandDecorationDto {
  @ApiProperty({
    example: 'Assets/Decoration/Tree/Tree_01.prefab',
    required: true,
    description: '파일 경로',
  })
  @IsString({ message: '파일 경로는 문자열이어야 해요.' })
  @IsOptional()
  readonly path?: string;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localPositionX는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localPositionX?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localPositionY는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localPositionY?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localPositionZ는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localPositionZ?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localScaleX는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localScaleX?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localScaleY는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localScaleY?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z 크기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localScaleZ는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localScaleZ?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localEulerAngleX는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localEulerAngleX?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localEulerAngleY는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localEulerAngleY?: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z 오일러 각도',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'localEulerAngleZ는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly localEulerAngleZ?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '랜드 id',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'landId는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly landId?: number;
}
