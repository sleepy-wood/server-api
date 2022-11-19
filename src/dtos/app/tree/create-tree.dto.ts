import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTreeDto {
  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무 이름',
  })
  @IsString({ message: '나무 이름은 문자열이어야 해요.' })
  @IsNotEmpty({ message: '나무 이름은 필수 입력 항목이에요.' })
  readonly treeName: string;

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
  @IsNotEmpty({ message: 'seed 번호는 필수 입력 항목이에요.' })
  readonly seedNumber: number;

  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무 파이프라인 이름',
  })
  @IsString({ message: '나무 종류는 문자열이어야 해요.' })
  @IsNotEmpty({ message: '나무 종류는 필수 입력 항목이에요.' })
  readonly treePipeName: string;

  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무가지 Material 이름',
  })
  @IsString({ message: '나무가지 Material 이름은 문자열이어야 해요.' })
  @IsNotEmpty({ message: '나무가지 Material 이름은 필수 입력 항목이에요.' })
  readonly barkMaterial: string;

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
  @IsNotEmpty({ message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 필수 입력 항목이에요.' })
  readonly sproutColor1: number;

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
  @IsNotEmpty({ message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 필수 입력 항목이에요.' })
  readonly sproutColor2: number;

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
  @IsNotEmpty({ message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 필수 입력 항목이에요.' })
  readonly sproutColor3: number;

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
  @IsNotEmpty({ message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 필수 입력 항목이에요.' })
  readonly sproutColor4: number;

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
  @IsNotEmpty({ message: '나뭇잎 종류에 따른 색깔 5가지 활성화 여부는 필수 입력 항목이에요.' })
  readonly sproutColor5: number;

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
  @IsNotEmpty({ message: '랜드 아이디는 필수 입력 항목이에요.' })
  readonly landId: number;

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
  @IsNotEmpty({ message: '나무 scale은 필수 입력 항목이에요.' })
  readonly scale: number;

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
  @IsNotEmpty({ message: '나무 가지 개수 1은 필수 입력 항목이에요.' })
  readonly branch1: number;

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
  @IsNotEmpty({ message: '나무 가지 개수 2는 필수 입력 항목이에요.' })
  readonly branch2: number;

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
  @IsNotEmpty({ message: '나무 가지 개수 3은 필수 입력 항목이에요.' })
  readonly branch3: number;

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
  @IsNotEmpty({ message: '나무 가지 개수 4는 필수 입력 항목이에요.' })
  readonly branch4: number;

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
  @IsNotEmpty({ message: '나뭇잎 개수는 필수 입력 항목이에요.' })
  readonly sproutNum: number;

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
  @IsNotEmpty({ message: '나뭇잎 썩은 비율은 필수 입력 항목이에요.' })
  readonly rottenRate: number;

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
  @IsNotEmpty({ message: '나뭇잎 너비는 필수 입력 항목이에요.' })
  readonly sproutWidth: number;

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
  @IsNotEmpty({ message: '중력은 필수 입력 항목이에요.' })
  readonly gravity: number;
}
