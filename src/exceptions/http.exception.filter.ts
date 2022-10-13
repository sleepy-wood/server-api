import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

import * as U from '@util/index';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    U.logger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const headers = request.headers;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? Array.isArray(exception.getResponse()['message'])
          ? this.eToK(exception.getResponse()['message']).join('\r\n')
          : exception.message
        : '서버 오류가 발생했어요.';

    const responseBody = {
      result: false,
      status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      message,
      headers,
      requestData: {
        query: request.query,
        params: request.params,
        body: request.body,
      },
    };

    return httpAdapter.reply(response, responseBody, status);
  }

  private eToK = (strArr: string[]) =>
    strArr.map((str) =>
      str
        .replace('property ', '')
        .replace(' should not exist', ' 속성을(를) 포함해선 안돼요.'),
    );
}
