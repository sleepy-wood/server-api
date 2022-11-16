import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Product]),
    TypeOrmModule.forFeature([E.ProductImage]),
    forwardRef(() => M.FileModule),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.ProductService],
  providers: [S.ProductService],
  controllers: [C.ProductController],
})
export class ProductModule implements NestModule {
  // exclude 쓰면 wildcard 금지
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MW.AuthMiddleware)
      .exclude(
        { path: 'v1/products', method: RequestMethod.GET },
        { path: 'v1/products/:id', method: RequestMethod.GET },
        { path: 'v1/products/category', method: RequestMethod.GET },
        { path: 'v1/products/search', method: RequestMethod.GET },
        { path: 'v1/products/extra/:id', method: RequestMethod.GET },
        { path: 'v1/products/recommend/:id', method: RequestMethod.GET },
      )
      .forRoutes(
        { path: 'v1/products', method: RequestMethod.POST },
        { path: 'v1/products/:id', method: RequestMethod.PUT },
        { path: 'v1/products/:id', method: RequestMethod.DELETE },
      );
  }
}
