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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import * as D from '../../dtos';
import * as E from '../../entities';
import * as I from '../../interfaces';
import { TreeGrowthService } from '../../services';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';

@ApiBearerAuth()
@ApiTags('tree-growths')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'tree-growths',
  version: '1',
})
export class TreeGrowthController {
  constructor(private readonly treeGrowthService: TreeGrowthService) {}

  @ApiOperation({ summary: '나무 성장 생성' })
  @HttpCode(StatusCodes.OK)
  @Post()
  async create(@Req() req: I.RequestWithUser, @Body() body: D.CreateTreeGrowthDto) {
    if (!req.user) throw new HttpException('NO_USER');
    return <I.BasicResponse<E.TreeGrowth>>{
      result: true,
      data: await this.treeGrowthService.grow(req, body),
    };
  }
}
