import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';

import * as I from '@interface/index';
import * as U from '@util/index';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const contextType = context.getType();
    const transaction = await this.sequelize.transaction();

    switch (contextType) {
      case 'http':
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest<I.RequestWithSupervisor | I.RequestWithUser>();
        req.transaction = transaction;
        break;

      case 'ws':
        const wsContext = context.switchToWs();
        const client = wsContext.getClient<I.WebSocketWithSupervisor | I.WebSocketWithUser>();
        client.transaction = transaction;
        break;

      case 'rpc':
        break;

      default:
        U.logger.error('It should not happen');
        break;
    }

    return next.handle().pipe(
      tap(() => {
        transaction.commit();
      }),
      catchError((err) => {
        transaction.rollback();
        return throwError(() => err);
      }),
    );
  }
}
