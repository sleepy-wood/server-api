import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomMemberDto {
  @ApiProperty({
    example: 1,
    required: true,
    description: '사용자 아이디',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '사용자 아이디는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '사용자 아이디는 필수 입력 항목이에요.' })
  readonly userId: number;
}
