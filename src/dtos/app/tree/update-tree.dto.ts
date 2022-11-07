import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTreeDto {
  @ApiProperty({
    example: 'Tree',
    required: false,
    description: '나무 이름',
  })
  @IsString({ message: '나무 이름은 문자열이어야 해요.' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    example: 1,
    required: false,
    description: '나무 성장일',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 성장일은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly treeDay?: number;
}
