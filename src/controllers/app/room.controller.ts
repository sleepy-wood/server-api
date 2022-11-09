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
import { RoomService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('rooms')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'rooms',
  version: '1',
})
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: '포톤 룸 입실' })
  @ApiParam({
    name: 'id',
    description: '룸 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Post(':id')
  async enterRoom(@Req() req: I.RequestWithUser, @Param('id') id: string, @Body() body: D.CreateRoomMemberDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.RoomMember>>{
      result: true,
      data: await this.roomService.enterRoom(req, +id, body),
    };
  }

  @ApiOperation({ summary: '포톤 룸 퇴실' })
  @ApiParam({
    name: 'id',
    description: '룸 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @ApiParam({
    name: 'roomMemberId',
    description: '멤버 아이디',
    required: true,
    schema: {
      type: 'string',
      example: '1',
    },
  })
  @HttpCode(StatusCodes.OK)
  @Delete(':id/roomMembers/:roomMemberId')
  async leaveRoom(@Req() req: I.RequestWithUser, @Param('id') id: string, @Param('roomMemberId') roomMemberId: string) {
    if (!req.user) throw new HttpException('NO_USER');
    await this.roomService.leaveRoom(req, +id, +roomMemberId);
    return <I.BasicResponse<boolean>>{
      result: true,
    };
  }

  @ApiOperation({ summary: '포톤 방 상세조회' })
  @ApiParam({
    name: 'id',
    description: '룸 아이디',
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
    return <I.BasicResponse<E.Room>>{
      result: true,
      data: await this.roomService.findOne(req, +id),
    };
  }
}
