import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString, IsEnum, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '/resources/12312321.png',
    required: true,
    description: '유저 프로필 이미지',
  })
  @IsString({ message: '유저 프로필 이미지는 문자열이어야 해요.' })
  @IsOptional()
  readonly profileImg?: string;

  @ApiProperty({
    example: '/resources/12312321.png',
    required: true,
    description: '유저 아바타',
  })
  @IsString({ message: '유저 아바타는 문자열이어야 해요.' })
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({
    example: 1,
    required: true,
    description: '현재 사용자가 위치 해있는 랜드 아이디',
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { message: '현재 사용자가 위치 해있는 랜드 아이디는 숫자여야 해요.' },
  )
  @IsOptional()
  readonly currentLandId?: number;
}
