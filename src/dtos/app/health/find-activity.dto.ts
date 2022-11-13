import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class FindWeekDataQuery {
  @ApiProperty({
    example: new Date(),
    required: true,
    description: '날짜',
  })
  @IsDateString({ strict: false }, { message: '날짜가 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '날짜는 필수 입력 항목이에요.' })
  readonly date: Date;
}
