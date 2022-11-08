import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [TypeOrmModule.forFeature([E.Weather]), forwardRef(() => M.UserModule)],
  exports: [TypeOrmModule, S.JWTService, S.UtilService],
  providers: [S.JWTService, S.UtilService],
  controllers: [C.UtilController],
})
export class UtilModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/utils*',
      method: RequestMethod.ALL,
    });
  }
}
