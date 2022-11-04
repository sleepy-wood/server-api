import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../controllers';
import * as E from '../entities';
import * as M from '../modules';
import * as MW from '../middlewares';
import * as S from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([E.Product]), forwardRef(() => M.UserModule), forwardRef(() => M.UtilModule)],
  exports: [TypeOrmModule, S.ProductService],
  providers: [S.ProductService],
  controllers: [C.ProductController],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/products*',
      method: RequestMethod.ALL,
    });
  }
}
