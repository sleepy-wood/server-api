import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

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
  readonly treeId: number;

  @ApiProperty({
    example: [1, 2, 3, 4],
    required: true,
    description: '수면 아이디',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '수면 아이디는 숫자여야 해요.', each: true },
  )
  @IsNotEmpty({ message: '수면 아이디는 필수 입력 항목이에요.' })
  readonly sleepIds: number[];

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
