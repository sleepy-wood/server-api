import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

import * as I from '../../../interfaces';

export class CreateSleepDto {
  @ApiProperty({
    example: new Date(),
    required: true,
    description: '잠든 시간',
  })
  @IsDateString({ strict: false }, { message: '잠든 시간이 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '잠든 시간은 필수 입력 항목이에요.' })
  readonly startDate: Date;

  @ApiProperty({
    example: new Date(),
    required: true,
    description: '깨어난 시간',
  })
  @IsDateString({ strict: false }, { message: '깨어난 시간이 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '깨어난 시간은 필수 입력 항목이에요.' })
  readonly endDate: Date;

  @ApiProperty({
    enum: [0, 1, 2, 3, 4, 5],
    example: 0,
    default: I.SleepType.InBed,
    required: true,
    description: '수면 유형',
  })
  @IsEnum(I.SleepType, { message: '수면 유형이 올바르지 않아요.' })
  @IsNotEmpty({ message: '수면 유형은 필수 입력 항목이에요.' })
  readonly type: keyof typeof I.SleepType;
}
