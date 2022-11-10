import { Controller, Get, HttpCode, UseInterceptors, CacheInterceptor, Req, Query, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @ApiOperation({ summary: '사용자 Trending 10 목록 가져오기 기준(조회수)' })
  @HttpCode(StatusCodes.OK)
  @Get('/trending-ten')
  async trendingTen() {
    const [rows, count] = await this.userService.trendingTen();
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
    const [rows, count] = await this.userService.topTen();
    return <I.RowResponse<E.User>>{
      result: true,
      count,
      data: rows,
    };
  }

  @ApiOperation({ summary: '사용자 수정' })
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
