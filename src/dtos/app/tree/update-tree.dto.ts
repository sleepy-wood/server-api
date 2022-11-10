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
    description: '나무 종류',
  })
  @IsString({ message: '나무 종류는 문자열이어야 해요.' })
  @IsOptional()
  readonly seedType?: string;

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
}
