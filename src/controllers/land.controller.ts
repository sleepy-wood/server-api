import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
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
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import { LandService } from '../services';
import { StatusCodes } from '../constants';
import { HttpException } from '../exceptions';

@ApiBearerAuth()
@ApiTags('lands')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'lands',
  version: '1',
})
export class LandController {
  constructor(private readonly landService: LandService) {}

  @ApiOperation({ summary: '랜드 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: any) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Land>>{
      result: true,
      data: await this.landService.create(req, body, I.ContextType.Request),
    };
  }

  @ApiOperation({ summary: '랜드 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: any) {
    if (!req.user) throw new HttpException('NO_USER');
    const { rows, count } = await this.landService.findAll(req, query);
    return <I.RowResponse<E.Land>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '랜드 상세조회' })
  @ApiParam({
    name: 'id',
    description: '랜드 아이디',
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
    return <I.BasicResponse<E.Land>>{
      result: true,
      data: await this.landService.findOne(req, +id, I.ContextType.Request),
    };
  }

  @ApiOperation({ summary: '랜드 수정' })
  @ApiParam({
    name: 'id',
    description: '랜드 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: any) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<boolean>>{
      result: true,
      data: await this.landService.update(req, +id, body, I.ContextType.Request),
    };
  }

  @ApiOperation({ summary: '랜드 삭제' })
  @ApiParam({
    name: 'id',
    description: '랜드 아이디',
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
    return <I.BasicResponse<boolean>>{
      result: true,
      data: await this.landService.remove(req, +id, I.ContextType.Request),
    };
  }
}
