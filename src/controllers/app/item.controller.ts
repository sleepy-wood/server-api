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
import { ItemService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('items')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'items',
  version: '1',
})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: '아이템 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateItemDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Item>>{
      result: true,
      data: await this.itemService.create(req, body),
    };
  }

  @ApiOperation({ summary: '아이템 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.itemService.findAll(req, query);
    return <I.RowResponse<E.Item>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '아이템 상세조회' })
  @ApiParam({
    name: 'id',
    description: '아이템 아이디',
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
    return <I.BasicResponse<E.Item>>{
      result: true,
      data: await this.itemService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '아이템 수정' })
  @ApiParam({
    name: 'id',
    description: '아이템 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateBridgeDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.itemService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '아이템 삭제' })
  @ApiParam({
    name: 'id',
    description: '아이템 아이디',
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
    await this.itemService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
