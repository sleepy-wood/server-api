import { Controller, Get, HttpCode, UseInterceptors, CacheInterceptor, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import * as E from '../../entities';
import * as I from '../../interfaces';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';
import { UtilService } from '../../services';

@ApiBearerAuth()
@ApiTags('utils')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'utils',
  version: '1',
})
export class UtilController {
  constructor(private readonly utilService: UtilService) {}

  @ApiOperation({ summary: '날씨 데이터 가져오기' })
  @HttpCode(StatusCodes.OK)
  @Get('/weather')
  async findOne(@Req() req: I.RequestWithUser) {
    if (!req.user) throw new HttpException('NO_USER');
    const [data] = await this.utilService.find(req);
    return <I.BasicResponse<any>>{
      result: true,
      data,
    };
  }
}
