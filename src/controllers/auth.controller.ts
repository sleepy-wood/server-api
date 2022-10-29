import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Controller, Post, HttpCode, Body, UseInterceptors, CacheInterceptor, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

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
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(E.User)
    private readonly user: Repository<E.User>,
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '로그인(임시)' })
  @HttpCode(StatusCodes.OK)
  @Post('login/temp')
  async loginTemp(): Promise<any> {
    const user = await this.user.findOne({ where: { id: 1 } });
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

  @ApiOperation({ summary: '구글 로그인' })
  @HttpCode(StatusCodes.OK)
  @Post('login/google')
  async loginGoogle(): Promise<any> {
    return {
      result: true,
      data: {
        token: 'token',
      },
    };
  }

  @ApiOperation({ summary: '카카오 로그인' })
  @HttpCode(StatusCodes.OK)
  @Post('login/kakao')
  async loginKakao(): Promise<any> {
    const kakao_api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${this.configService.get<string>(
      'KAKAO_REST_API',
    )}
    &redirect_uri=${this.configService.get<string>('KAKAO_REDIRECT_URL')}
    &response_type=code`;

    const token_res = await this.httpService.axiosRef.post<any>(kakao_api_url);
    console.log(token_res);

    return {
      result: true,
      data: {
        token: 'token',
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
