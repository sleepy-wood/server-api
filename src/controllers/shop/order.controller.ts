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
import { OrderService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('orders')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'orders',
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '주문 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateOrderDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Order>>{
      result: true,
      data: await this.orderService.create(req, body),
    };
  }

  @ApiOperation({ summary: '주문 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.FindOrderDto) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.orderService.findAll(req, query);
    return <I.RowResponse<E.Order>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '월별 주문 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get('/monthly')
  async findAllGroupByMonth(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Order[]>>{
      result: true,
      data: await this.orderService.findAllGroupByMonth(req, query),
    };
  }

  @ApiOperation({ summary: '주문 상세조회' })
  @ApiParam({
    name: 'id',
    description: '주문 아이디',
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
    return <I.BasicResponse<E.Order>>{
      result: true,
      data: await this.orderService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '주문 수정' })
  @ApiParam({
    name: 'id',
    description: '주문 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateOrderDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.orderService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '주문 삭제' })
  @ApiParam({
    name: 'id',
    description: '주문 아이디',
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
    await this.orderService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
