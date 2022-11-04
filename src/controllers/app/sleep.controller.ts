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
import { SleepService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('sleeps')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'sleeps',
  version: '1',
})
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  @ApiOperation({ summary: '수면 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateSleepDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Sleep>>{
      result: true,
      data: await this.sleepService.create(req, body),
    };
  }

  @ApiOperation({ summary: '수면 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.sleepService.findAll(req, query);
    return <I.RowResponse<E.Sleep>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '수면 상세조회' })
  @ApiParam({
    name: 'id',
    description: '수면 아이디',
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
    return <I.BasicResponse<E.Sleep>>{
      result: true,
      data: await this.sleepService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '수면 수정' })
  @ApiParam({
    name: 'id',
    description: '수면 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateSleepDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.sleepService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '수면 삭제' })
  @ApiParam({
    name: 'id',
    description: '수면 아이디',
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
    await this.sleepService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
