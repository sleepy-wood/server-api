import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import * as C from '@controller/index';
import * as M from '@module/index';
import * as Models from '@model/index';
import * as MW from '@middleware/index';
import * as S from '@service/index';

@Module({
  imports: [SequelizeModule.forFeature([Models.User]), forwardRef(() => M.UtilModule)],
  controllers: [C.UserController],
  providers: [S.UserService],
  exports: [SequelizeModule, S.UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/users*',
      method: RequestMethod.ALL,
    });
  }
}
