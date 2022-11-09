import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '..';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Room]),
    TypeOrmModule.forFeature([E.RoomMember]),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.RoomService],
  providers: [S.RoomService],
  controllers: [C.RoomController],
})
export class RoomModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/rooms*',
      method: RequestMethod.ALL,
    });
  }
}
