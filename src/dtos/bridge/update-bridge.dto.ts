import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateBridgeDto {
  @ApiProperty({
    example: 'Bridge',
    required: false,
    description: '다리 이름',
  })
  @IsString({ message: '다리 이름은 문자열이어야 해요.' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'x축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 좌표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly positionX?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'y축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 좌표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly positionY?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'z축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 좌표는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly positionZ?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'x축 회전',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 회전은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly rotationX?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'y축 회전',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 회전은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly rotationY?: number;

  @ApiProperty({
    example: 12.34,
    required: false,
    description: 'z축 회전',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 회전은 숫자여야 해요.' },
  )
  @IsOptional()
  readonly rotationZ?: number;
}
