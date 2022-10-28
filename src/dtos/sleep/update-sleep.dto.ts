import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateSleepDto {
  @ApiProperty({
    example: new Date(),
    required: false,
    description: '잠든 시간',
  })
  @IsDateString({ strict: false }, { message: '잠든 시간이 올바른 날짜 형식이 아니에요.' })
  @IsOptional()
  readonly sleepAt?: Date;

  @ApiProperty({
    example: new Date(),
    required: false,
    description: '깨어난 시간',
  })
  @IsDateString({ strict: false }, { message: '깨어난 시간이 올바른 날짜 형식이 아니에요.' })
  @IsOptional()
  readonly wakeAt?: Date;
}
