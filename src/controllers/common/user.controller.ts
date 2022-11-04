import { Controller, Get, HttpCode, UseInterceptors, CacheInterceptor, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';
import { UserService } from '../../services';

@ApiBearerAuth()
@ApiTags('users')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '사용자 상세조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  async findOne(@Req() req: I.RequestWithUser) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.User>>{
      result: true,
      data: await this.userService.findOne(req),
    };
  }
}
