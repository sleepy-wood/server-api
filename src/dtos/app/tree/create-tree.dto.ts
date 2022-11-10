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
    description: '나무 종류',
  })
  @IsString({ message: '나무 종류는 문자열이어야 해요.' })
  @IsNotEmpty({ message: '나무 종류는 필수 입력 항목이에요.' })
  readonly seedType: string;

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
    description: '나무 기둥 길이',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 기둥 길이는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '나무 기둥 길이는 필수 입력 항목이에요.' })
  readonly trunkLength: number;

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

  @ApiProperty({
    example: 1,
    required: true,
    description: '뿌리 개수',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '뿌리 개수는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '뿌리 개수는 필수 입력 항목이에요.' })
  readonly rootNum: number;

  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무가지 텍스처 이름',
  })
  @IsString({ message: '나무가지 텍스처 이름은 문자열이어야 해요.' })
  @IsNotEmpty({ message: '나무가지 텍스처 이름은 필수 입력 항목이에요.' })
  readonly barkTexture: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나뭇잎 enabled 상태',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나뭇잎 enabled 상태는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '나뭇잎 enabled 상태는 필수 입력 항목이에요.' })
  readonly sproutIndex: number;
}
