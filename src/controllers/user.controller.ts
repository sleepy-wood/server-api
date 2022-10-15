import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import * as D from '../dtos';
import * as E from '../entities';
import * as I from '../interfaces';
import { StatusCodes } from '../constants';
import { HttpException } from '../exceptions';
import { UserService } from '../services';

@ApiBearerAuth()
@ApiTags('users')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '사용자 추가' })
  @HttpCode(StatusCodes.OK)
  @Post()
  create(@Body() body: D.CreateUserDto) {
    const test = true;

    if (!test) {
      return new HttpException('COMMON_ERROR');
    }

    return this.userService.create(body);
  }

  @ApiOperation({ summary: '사용자 목록 조회' })
  @HttpCode(StatusCodes.OK)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '사용자 상세조회' })
  @HttpCode(StatusCodes.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '사용자 수정' })
  @HttpCode(StatusCodes.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: D.UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @HttpCode(StatusCodes.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
