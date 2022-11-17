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
import { TreeService, TreePipelineService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('trees')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'trees',
  version: '1',
})
export class TreeController {
  constructor(private readonly treeService: TreeService, private readonly treePipelineService: TreePipelineService) {}

  @ApiOperation({ summary: '나무 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateTreeDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Tree>>{
      result: true,
      data: await this.treeService.create(req, body),
    };
  }

  @ApiOperation({ summary: '다른 사용자 나무 목록 조회' })
  @ApiParam({
    name: 'id',
    description: '사용자 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Get('/users/:userId')
  async findAllOther(@Req() req: I.RequestWithUser, @Param('userId') userId: string, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.treeService.findAllOther(req, query, +userId);
    return <I.RowResponse<E.Tree>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '내 나무 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAllMine(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.treeService.findAllMine(req, query);
    return <I.RowResponse<E.Tree>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '나무 상세조회' })
  @ApiParam({
    name: 'id',
    description: '나무 아이디',
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
    return <I.BasicResponse<E.Tree>>{
      result: true,
      data: await this.treeService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '나무 수정' })
  @ApiParam({
    name: 'id',
    description: '나무 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateTreeDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.treeService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '나무 삭제' })
  @ApiParam({
    name: 'id',
    description: '나무 아이디',
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
    await this.treeService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '나무 파이프라인 수정' })
  @ApiParam({
    name: 'id',
    description: '나무 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @ApiParam({
    name: 'pipelineId',
    description: '나무 파이프라인 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id/pipeline/:pipelineId')
  async updateTreePipeline(
    @Req() req: I.RequestWithUser,
    @Param('id') id: string,
    @Param('pipelineId') pipelineId: string,
    @Body() body: D.UpdateTreePipelineDto,
  ) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.treePipelineService.update(req, +id, +pipelineId, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
