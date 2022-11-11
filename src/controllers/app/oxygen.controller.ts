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
import { OxygenService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('oxygen')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'oxygen',
  version: '1',
})
export class OxygenController {
  constructor(private readonly oxygenService: OxygenService) {}

  @ApiOperation({ summary: '산소포화도 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateOxygenDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Oxygen>>{
      result: true,
      data: await this.oxygenService.create(req, body),
    };
  }

  @ApiOperation({ summary: '산소포화도 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.oxygenService.findAll(req, query);
    return <I.RowResponse<E.Oxygen>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '산소포화도 상세조회' })
  @ApiParam({
    name: 'id',
    description: '산소포화도 아이디',
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
    return <I.BasicResponse<E.Oxygen>>{
      result: true,
      data: await this.oxygenService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '산소포화도 수정' })
  @ApiParam({
    name: 'id',
    description: '산소포화도 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateOxygenDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.oxygenService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '산소포화도 삭제' })
  @ApiParam({
    name: 'id',
    description: '산소포화도 아이디',
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
    await this.oxygenService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
