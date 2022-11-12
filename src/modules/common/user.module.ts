import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [TypeOrmModule.forFeature([E.User]), forwardRef(() => M.ProductModule), forwardRef(() => M.UtilModule)],
  exports: [TypeOrmModule, S.UserService],
  providers: [S.UserService],
  controllers: [C.UserController],
})
export class UserModule implements NestModule {
  // exclude 쓰면 wildcard 금지
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MW.AuthMiddleware)
      .exclude(
        { path: 'v1/users/profile/:id', method: RequestMethod.GET },
        { path: 'v1/users/trending-ten', method: RequestMethod.GET },
        { path: 'v1/users/top-ten', method: RequestMethod.GET },
      )
      .forRoutes({
        path: 'v1/users',
        method: RequestMethod.ALL,
      });
  }
}
