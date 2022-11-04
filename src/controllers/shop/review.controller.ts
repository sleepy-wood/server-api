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
import { ReviewService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('reviews')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'reviews',
  version: '1',
})
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '리뷰 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateReviewDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.Review>>{
      result: true,
      data: await this.reviewService.create(req, body),
    };
  }

  @ApiOperation({ summary: '리뷰 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findAll(@Req() req: I.RequestWithUser, @Query() query: D.ListQuery) {
    if (!req.user) throw new HttpException('NO_USER');
    const [rows, count] = await this.reviewService.findAll(req, query);
    return <I.RowResponse<E.Review>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '리뷰 상세조회' })
  @ApiParam({
    name: 'id',
    description: '리뷰 아이디',
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
    return <I.BasicResponse<E.Review>>{
      result: true,
      data: await this.reviewService.findOne(req, +id),
    };
  }

  @ApiOperation({ summary: '리뷰 수정' })
  @ApiParam({
    name: 'id',
    description: '리뷰 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  async update(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.UpdateReviewDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.reviewService.update(req, +id, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '리뷰 삭제' })
  @ApiParam({
    name: 'id',
    description: '리뷰 아이디',
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
    await this.reviewService.remove(req, +id);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
