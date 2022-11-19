import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTreeDto {
  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무 이름',
  })
  @IsString({ message: '나무 이름은 문자열이어야 해요.' })
  @IsOptional()
  readonly treeName?: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: 'seed 번호',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'seed 번호는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly seedNumber?: number;

  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무 파이프라인 이름',
  })
  @IsString({ message: '나무 종류는 문자열이어야 해요.' })
  @IsOptional()
  readonly treePipeName?: string;

  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무가지 Material 이름',
  })
  @IsString({ message: '나무가지 Material 이름은 문자열이어야 해요.' })
  @IsOptional()
  readonly barkMaterial?: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutColor1?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutColor2?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutColor3?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutColor4?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutColor5?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '랜드 아이디',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '랜드 아이디는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly landId?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 scale',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 scale은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly scale?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 가지 개수 1',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 가지 개수 1은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly branch1?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 가지 개수 2',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 가지 개수 2는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly branch2?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 가지 개수 3',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 가지 개수 3은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly branch3?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 가지 개수 4',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 가지 개수 4는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly branch4?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 개수',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 개수는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutNum?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 썩은 비율',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 썩은 비율은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly rottenRate?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 너비',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 너비는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly sproutWidth?: number;

  @ApiProperty({
    example: 1,
    required: true,
    description: '중력',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '중력은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly gravity?: number;
}
