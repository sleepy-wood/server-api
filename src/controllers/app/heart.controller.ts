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
import { HeartService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('heart')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'heart',
  version: '1',
})
export class HeartController {
  constructor(private readonly heartService: HeartService) {}

  @ApiOperation({ summary: '분당 심박수 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateHeartDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Heart>>{
      result: true,
      data: await this.heartService.create(req, body),
    };
  }

  @ApiOperation({ summary: '분당 심박수 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.heartService.findAll(req, query);
    return <I.RowResponse<E.Heart>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '분당 심박수 상세조회' })
  @ApiParam({
    name: 'id',
    description: '분당 심박수 아이디',
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
    return <I.BasicResponse<E.Heart>>{
      result: true,
      data: await this.heartService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '분당 심박수 수정' })
  @ApiParam({
    name: 'id',
    description: '분당 심박수 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateHeartDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.heartService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '분당 심박수 삭제' })
  @ApiParam({
    name: 'id',
    description: '분당 심박수 아이디',
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
    await this.heartService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
