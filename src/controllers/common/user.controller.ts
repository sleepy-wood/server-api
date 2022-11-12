import { Controller, Get, HttpCode, UseInterceptors, CacheInterceptor, Req, Body, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';
import { UserService } from '../../services';

@ApiTags('users')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '사용자 상세조회' })
  @ApiBearerAuth()
  @HttpCode(StatusCodes.OK)
  @Get()
  async findOne(@Req() req: I.RequestWithUser) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.User>>{
      result: true,
      data: await this.userService.findOne(req),
    };
  }

  @ApiOperation({ summary: '사용자 상세조회 by userId' })
  @ApiParam({
    name: 'id',
    description: '유저 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Get('/profile/:id')
  async findById(@Req() req: I.RequestWithUser, @Param('id') id: string) {
    return <I.BasicResponse<E.User[]>>{
      result: true,
      data: await this.userService.findById(req, +id),
    };
  }

  @ApiOperation({ summary: '사용자 Trending 10 목록 가져오기 기준(조회수)' })
  @HttpCode(StatusCodes.OK)
  @Get('/trending-ten')
  async trendingTen() {
    const [rows, count] = await this.userService.findTrendingTen();
    return <I.RowResponse<E.User>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '사용자 Top 10 목록 가져오기 기준(판매 등록 에셋수)' })
  @HttpCode(StatusCodes.OK)
  @Get('/top-ten')
  async topTen() {
    const [rows, count] = await this.userService.findTopTen();
    return <I.RowResponse<E.User>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '사용자 수정' })
  @ApiBearerAuth()
  @HttpCode(StatusCodes.OK)
  @Put()
  async update(@Req() req: I.RequestWithUser, @Body() body: D.UpdateUserDto) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.userService.update(req, body);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }
}
