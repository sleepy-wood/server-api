import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '..';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Bridge]),
    TypeOrmModule.forFeature([E.BridgeInfo]),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.BridgeService, S.BridgeInfoService],
  providers: [S.BridgeService, S.BridgeInfoService],
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
