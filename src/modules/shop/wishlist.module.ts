import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Wishlist]),
    TypeOrmModule.forFeature([E.WishlistItem]),
    forwardRef(() => M.ProductModule),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.WishlistService],
  providers: [S.WishlistService],
  controllers: [C.WishlistController],
})
export class WishlistModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/wishlists*',
      method: RequestMethod.ALL,
    });
  }
}
