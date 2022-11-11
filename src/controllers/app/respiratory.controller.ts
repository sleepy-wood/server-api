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
import { RespiratoryService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('respiratory')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'respiratory',
  version: '1',
})
export class RespiratoryController {
  constructor(private readonly respiratoryService: RespiratoryService) {}

  @ApiOperation({ summary: '분당 호흡수 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateRespiratoryDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Respiratory>>{
      result: true,
      data: await this.respiratoryService.create(req, body),
    };
  }

  @ApiOperation({ summary: '분당 호흡수 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.respiratoryService.findAll(req, query);
    return <I.RowResponse<E.Respiratory>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '분당 호흡수 상세조회' })
  @ApiParam({
    name: 'id',
    description: '분당 호흡수 아이디',
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
    return <I.BasicResponse<E.Respiratory>>{
      result: true,
      data: await this.respiratoryService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '분당 호흡수 수정' })
  @ApiParam({
    name: 'id',
    description: '분당 호흡수 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateRespiratoryDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.respiratoryService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '분당 호흡수 삭제' })
  @ApiParam({
    name: 'id',
    description: '분당 호흡수 아이디',
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
    await this.respiratoryService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
