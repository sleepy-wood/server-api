import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../controllers';
import * as E from '../entities';
import * as M from '../modules';
import * as MW from '../middlewares';
import * as S from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([E.Cart]), forwardRef(() => M.UserModule), forwardRef(() => M.UtilModule)],
  exports: [TypeOrmModule, S.CartService],
  providers: [S.CartService],
  controllers: [C.CartController],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/carts*',
      method: RequestMethod.ALL,
    });
  }
}
