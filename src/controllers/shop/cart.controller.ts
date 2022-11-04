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
import { CartService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('carts')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'carts',
  version: '1',
})
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: '다리 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateCartDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Cart>>{
      result: true,
      data: await this.cartService.create(req, body),
    };
  }

  @ApiOperation({ summary: '다리 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.cartService.findAll(req, query);
    return <I.RowResponse<E.Cart>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '다리 상세조회' })
  @ApiParam({
    name: 'id',
    description: '다리 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Get(':id')
  async findOne(@Req() req: I.RequestWithUser, @Param('id') id: string) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Cart>>{
      result: true,
      data: await this.cartService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '다리 수정' })
  @ApiParam({
    name: 'id',
    description: '다리 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateCartDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.cartService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '다리 삭제' })
  @ApiParam({
    name: 'id',
    description: '다리 아이디',
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
    await this.cartService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
