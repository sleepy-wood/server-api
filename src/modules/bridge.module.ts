import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../controllers';
import * as E from '../entities';
import * as M from '../modules';
import * as MW from '../middlewares';
import * as S from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([E.Bridge, E.User]), forwardRef(() => M.UtilModule)],
  exports: [S.BridgeService],
  providers: [S.BridgeService],
  controllers: [C.BridgeController],
})
export class BridgeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/bridges*',
      method: RequestMethod.ALL,
    });
  }
}
