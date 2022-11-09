import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTreeGrowthDto {
  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 아이디',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 아이디는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '나무 아이디는 필수 입력 항목이에요.' })
  treeId: number;

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
  scale: number;

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
  branch1: number;

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
  branch2: number;

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
  branch3: number;

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
  branch4: number;

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
  trunkLength: number;

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
  sproutNum: number;

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
  rottenRate: number;

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
  gravity: number;

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
  rootNum: number;

  @ApiProperty({
    example: 'Tree',
    required: true,
    description: '나무가지 텍스처 이름',
  })
  @IsString({ message: '나무가지 텍스처 이름은 문자열이어야 해요.' })
  @IsNotEmpty({ message: '나무가지 텍스처 이름은 필수 입력 항목이에요.' })
  barkTexture: string;

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
  sproutIndex: number;
}
