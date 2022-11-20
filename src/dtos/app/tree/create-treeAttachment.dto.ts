import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTreeAttachmentDto {
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
    example: [1, 2],
    required: true,
    description: '첨부 파일 아이디',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: '첨부 파일 아이디는 숫자만 입력 가능해요.', each: true },
  )
  @IsNotEmpty({ message: '첨부 파일 아이디는 필수 입력 항목이에요.' })
  readonly attachFileIds: number[];
}
