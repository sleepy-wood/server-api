import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSleepDto {
  @ApiProperty({
    example: new Date(),
    required: true,
    description: '잠든 시간',
  })
  @IsDateString({ strict: false }, { message: '잠든 시간이 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '잠든 시간은 필수 입력 항목이에요.' })
  readonly sleepAt: Date;

  @ApiProperty({
    example: new Date(),
    required: true,
    description: '깨어난 시간',
  })
  @IsDateString({ strict: false }, { message: '깨어난 시간이 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '깨어난 시간은 필수 입력 항목이에요.' })
  readonly wakeAt: Date;
}
