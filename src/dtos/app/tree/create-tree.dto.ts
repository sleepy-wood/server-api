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
  readonly name: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: '나무 성장일',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '나무 성장일은 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '나무 성장일은 필수 입력 항목이에요.' })
  readonly treeDay: number;
}
