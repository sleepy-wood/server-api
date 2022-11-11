import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdateActivityDto {
  @ApiProperty({
    example: 2,
    required: true,
    description: '움직이기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '움직이기는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly activeEnergyBurnedInKcal: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: '움직이기 목표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '움직이기 목표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly activeEnergyBurnedGoalInKcal: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: '운동하기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '운동하기는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly exerciseTimeInMinutes: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: '운동하기 목표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '운동하기 목표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly exerciseTimeGoalInMinutes: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: '일어서기',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '일어서기는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly standHours: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: '일어서기 목표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '일어서기 목표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly standHoursGoal: number;

  @ApiProperty({
    example: new Date(),
    required: true,
    description: '날짜',
  })
  @IsDateString({ strict: false }, { message: '날짜가 올바른 날짜 형식이 아니에요.' })
  @IsOptional()
  readonly date: Date;
}
