import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

import * as I from '../../interfaces';

export class UpdateSleepDto {
  @ApiProperty({
    example: new Date(),
    required: false,
    description: '잠든 시간',
  })
  @IsDateString({ strict: false }, { message: '잠든 시간이 올바른 날짜 형식이 아니에요.' })
  @IsOptional()
  readonly startDate?: Date;

  @ApiProperty({
    example: new Date(),
    required: false,
    description: '깨어난 시간',
  })
  @IsDateString({ strict: false }, { message: '깨어난 시간이 올바른 날짜 형식이 아니에요.' })
  @IsOptional()
  readonly endDate?: Date;

  @ApiProperty({
    enum: I.SleepType,
    example: I.SleepType.InBed,
    default: I.SleepType.InBed,
    required: true,
    description: '수면 유형',
  })
  @IsEnum(I.SleepType, { message: '수면 유형이 올바르지 않아요.' })
  @IsOptional()
  readonly type?: keyof typeof I.SleepType;
}
