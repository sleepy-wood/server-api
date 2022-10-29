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

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import { LandDecorationService } from '../services';
import { StatusCodes } from '../constants';
import { HttpException } from '../exceptions';

@ApiBearerAuth()
@ApiTags('land-decorations')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'land-decorations',
  version: '1',
})
export class LandDecorationDecorationController {
  constructor(private readonly landDecorationService: LandDecorationService) {}
  @ApiOperation({ summary: '랜드 데코레이션 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateLandDecorationDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.LandDecoration>>{
      result: true,
      data: await this.landDecorationService.create(req, body),
    };
  }

  @ApiOperation({ summary: '랜드 데코레이션 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.landDecorationService.findAll(req, query);
    return <I.RowResponse<E.LandDecoration>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '랜드 데코레이션 상세조회' })
  @ApiParam({
    name: 'id',
    description: '랜드 데코레이션 아이디',
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
    return <I.BasicResponse<E.LandDecoration>>{
      result: true,
      data: await this.landDecorationService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '랜드 데코레이션 수정' })
  @ApiParam({
    name: 'id',
    description: '랜드 데코레이션 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateLandDecorationDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.landDecorationService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '랜드 데코레이션 삭제' })
  @ApiParam({
    name: 'id',
    description: '랜드 데코레이션 아이디',
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
    await this.landDecorationService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
