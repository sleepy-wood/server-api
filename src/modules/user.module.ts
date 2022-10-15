import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../controllers';
import * as E from '../entities';
import * as M from '../modules';
import * as MW from '../middlewares';
import * as S from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([E.User]), forwardRef(() => M.UtilModule)],
  exports: [S.UserService],
  controllers: [C.UserController],
  providers: [S.UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/users*',
      method: RequestMethod.ALL,
    });
  }
}
