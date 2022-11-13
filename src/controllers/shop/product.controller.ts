import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseInterceptors,
  CacheInterceptor,
  Req,
  Query,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import { ProductService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiTags('products')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'products',
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: '상품 생성' })
  @ApiBearerAuth()
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateProductDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Product>>{
      result: true,
      data: await this.productService.create(req, body),
    };
  }

  @ApiOperation({ summary: '상품 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.FindProductDto) {
    const [rows, count] = await this.productService.findAll(req, query);
    return <I.RowResponse<E.Product>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '마켓 카테고리별 사용자 5명씩 가져오기' })
  @HttpCode(StatusCodes.OK)
  @Get('/category')
  async findFiveByCategory() {
    const data = await this.productService.findFiveByCategory();
    return <I.BasicResponse<[E.User[], string][]>>{
      result: true,
      data,
    };
  }

  @ApiOperation({ summary: '상품 상세조회' })
  @ApiParam({
    name: 'id',
    description: '상품 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Get(':id')
  async findOne(@Req() req: I.RequestWithUser, @Param('id') id: string) {
    return <I.BasicResponse<E.Product>>{
      result: true,
      data: await this.productService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '상품 수정' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '상품 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateProductDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.productService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '상품 삭제' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '상품 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Delete(':id')
  async remove(@Req() req: I.RequestWithUser, @Param('id') id: string) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.productService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
