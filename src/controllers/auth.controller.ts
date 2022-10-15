import { Controller, Post, HttpCode, Body, UseInterceptors, CacheInterceptor, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

// import * as D from '../dtos';
import * as E from '../entities';
import { JWTService, UserService } from '../services';
import { StatusCodes } from '../constants';
import { HttpException } from '../exceptions';

@ApiTags('auth')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    @InjectRepository(E.User)
    private readonly user: Repository<E.User>,
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'SMS 인증 및 로그인',
    description: 'SMS 인증을 통해 JWT를 발급 받아 로그인해요.',
  })
  @HttpCode(StatusCodes.OK)
  @Post('signup/sms')
  async verifySMS(@Body() body: any): Promise<any> {
    const user = await this.userService.findOrCreate(body.hp, body.userType);

    if (!user) throw new HttpException('USER_VALIDATION');

    const [token, error] = this.jwtService.getJWTToken(user);

    if (error) throw error;

    return {
      result: true,
      data: {
        token,
        user,
      },
    };
  }

  @ApiOperation({ summary: '리프래쉬 토큰 발급' })
  @ApiBearerAuth()
  @HttpCode(StatusCodes.OK)
  @Post('refresh-token')
  async fetchRefreshToken(@Req() req: Request): Promise<any> {
    let refreshToken = '';

    const bearer = req.headers.authorization;
    const [, token] = bearer.split(' ');
    const [verificationResponse, verifyError] = this.jwtService.verifyToken(token);

    if (verifyError) throw verifyError;

    const { id: userId } = verificationResponse;
    const user = await this.user.findOneBy({ id: userId });
    if (!user) throw new HttpException('USER_VALIDATION');
    const [_token, error] = this.jwtService.getJWTToken(user, 5);
    if (error) throw error;
    refreshToken = _token;

    return {
      result: true,
      data: {
        refreshToken,
      },
    };
  }
}
