import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsNotEmpty, IsDateString, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ListQuery {
  @ApiProperty({
    description: '페이지',
    example: 1,
    required: false,
    default: 1,
  })
  @Type(() => Number)
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: '페이지는 숫자만 입력 가능해요.' },
  )
  @Min(1, { message: '페이지는 0보다 큰 값을 입력해주세요.' })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    description: '갯수',
    example: 30,
    required: false,
    default: 30,
  })
  @Type(() => Number)
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: '갯수는 숫자만 입력 가능해요.' },
  )
  @Min(1, { message: '갯수는 0보다 큰 값을 입력해주세요.' })
  @IsOptional()
  readonly count?: number;

  @ApiProperty({
    description: '정렬',
    example: 'createdAt',
    required: false,
    default: 'createdAt',
  })
  @IsString({ message: '정렬은 문자만 입력 가능해요.' })
  @IsOptional()
  readonly sort?: string;

  @ApiProperty({
    description: '차순',
    example: 'desc',
    required: false,
    default: 'desc',
    enum: {
      DESC: 'desc',
      ASC: 'asc',
    },
  })
  @IsString({ message: '차순은 문자만 입력 가능해요.' })
  @IsOptional()
  readonly dir?: 'desc' | 'asc' | 'DESC' | 'ASC';

  @ApiProperty({
    description: '검색',
    example: '검색',
    required: false,
  })
  @Length(2, 100, { message: '검색은 2자 이상 100자 이내로 입력 가능해요.' })
  @IsString({ message: '검색은 문자만 입력 가능해요.' })
  @IsOptional()
  readonly q?: string;
}
