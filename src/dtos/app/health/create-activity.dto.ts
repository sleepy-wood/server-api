import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateActivityDto {
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
  @IsNotEmpty({ message: '움직이기는 필수 입력 항목이에요.' })
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
  @IsNotEmpty({ message: '움직이기 목표는 필수 입력 항목이에요.' })
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
  @IsNotEmpty({ message: '운동하기는 필수 입력 항목이에요.' })
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
  @IsNotEmpty({ message: '운동하기 목표는 필수 입력 항목이에요.' })
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
  @IsNotEmpty({ message: '일어서기는 필수 입력 항목이에요.' })
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
  @IsNotEmpty({ message: '일어서기 목표는 필수 입력 항목이에요.' })
  readonly standHoursGoal: number;

  @ApiProperty({
    example: new Date(),
    required: true,
    description: '날짜',
  })
  @IsDateString({ strict: false }, { message: '날짜가 올바른 날짜 형식이 아니에요.' })
  @IsNotEmpty({ message: '날짜는 필수 입력 항목이에요.' })
  readonly date: Date;
}
