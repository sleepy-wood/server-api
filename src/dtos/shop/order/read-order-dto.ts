import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';

import * as I from '../../../interfaces';
import { ListQuery } from '../../';

export class FindOrderDto extends ListQuery {
  @ApiProperty({
    enum: I.ProductCategory,
    example: I.ProductCategory.emoticon,
    default: I.ProductCategory.emoticon,
    required: false,
    description: '상품 유형',
  })
  @IsEnum(I.ProductCategory, { message: '상품 카테고리가 올바르지 않아요.' })
  @IsOptional()
  readonly category?: I.ProductCategory;
}
