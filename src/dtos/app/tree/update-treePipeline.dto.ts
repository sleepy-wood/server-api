import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTreePipelineDto {
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
  @IsOptional()
  readonly treeId?: number;

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
  @IsOptional()
  readonly sleepIds?: number[];

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
