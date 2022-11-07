import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FileUploadQuery {
  @ApiProperty({
    description: '파일 업로드 유형',
    example: 'emoticon',
    required: false,
  })
  @IsString({ message: '파일 업로드 유형은 문자만 입력 가능해요.' })
  @IsNotEmpty({ message: '파일 업로드 유형은 필수 입력 항목이에요.' })
  readonly type: string;
}
