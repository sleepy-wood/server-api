import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLandDecorationDto {
  @ApiProperty({
    example: 'Assets/Decoration/Tree/Tree_01.prefab',
    required: true,
    description: '파일 경로',
  })
  @IsString({ message: '파일 경로는 문자열이어야 해요.' })
  @IsNotEmpty({ message: '파일 경로는 필수 입력 항목이에요.' })
  readonly path: string;

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
  @IsNotEmpty({ message: 'localPositionX는 필수 입력 항목이에요.' })
  readonly localPositionX: number;

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
  @IsNotEmpty({ message: 'localPositionY는 필수 입력 항목이에요.' })
  readonly localPositionY: number;

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
  @IsNotEmpty({ message: 'localPositionZ는 필수 입력 항목이에요.' })
  readonly localPositionZ: number;

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
  @IsNotEmpty({ message: 'localScaleX는 필수 입력 항목이에요.' })
  readonly localScaleX: number;

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
  @IsNotEmpty({ message: 'localScaleY는 필수 입력 항목이에요.' })
  readonly localScaleY: number;

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
  @IsNotEmpty({ message: 'localScaleZ는 필수 입력 항목이에요.' })
  readonly localScaleZ: number;

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
  @IsNotEmpty({ message: 'localEulerAngleX는 필수 입력 항목이에요.' })
  readonly localEulerAngleX: number;

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
  @IsNotEmpty({ message: 'localEulerAngleY는 필수 입력 항목이에요.' })
  readonly localEulerAngleY: number;

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
  @IsNotEmpty({ message: 'localEulerAngleZ는 필수 입력 항목이에요.' })
  readonly localEulerAngleZ: number;

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
  @IsNotEmpty({ message: 'landId는 필수 입력 항목이에요.' })
  readonly landId: number;
}
