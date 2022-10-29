import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBridgeDto {
  @ApiProperty({
    example: 1,
    required: true,
    description: '다리로 연결할 Land Id',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '다리로 연결할 Land Id는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '다리로 연결할 Land Id는 필수 입력 항목이에요.' })
  readonly fromLandId: number;

  @ApiProperty({
    example: 2,
    required: true,
    description: '다리로 연결할 Land Id',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '다리로 연결할 Land Id는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: '다리로 연결할 Land Id는 필수 입력 항목이에요.' })
  readonly toLandId: number;

  @ApiProperty({
    example: 'Bridge',
    required: true,
    description: '다리 이름',
  })
  @IsString({ message: '다리 이름은 문자열이어야 해요.' })
  @IsNotEmpty({ message: '다리 이름은 필수 입력 항목이에요.' })
  readonly name: string;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 좌표는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'x축 좌표는 필수 입력 항목이에요.' })
  readonly positionX: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 좌표는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'y축 좌표는 필수 입력 항목이에요.' })
  readonly positionY: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z축 좌표',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 좌표는 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'z축 좌표는 필수 입력 항목이에요.' })
  readonly positionZ: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'x축 회전',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'x축 회전은 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'x축 회전은 필수 입력 항목이에요.' })
  readonly rotationX: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'y축 회전',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'y축 회전은 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'y축 회전은 필수 입력 항목이에요.' })
  readonly rotationY: number;

  @ApiProperty({
    example: 12.34,
    required: true,
    description: 'z축 회전',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: 'z축 회전은 숫자여야 해요.' },
  )
  @IsNotEmpty({ message: 'z축 회전은 필수 입력 항목이에요.' })
  readonly rotationZ: number;
}
