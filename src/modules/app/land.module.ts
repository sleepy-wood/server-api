import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Land]),
    TypeOrmModule.forFeature([E.LandDecoration]),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.LandService, S.LandDecorationService],
  providers: [S.LandService, S.LandDecorationService],
  controllers: [C.LandController, C.LandDecorationDecorationController],
})
export class LandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/land*',
      method: RequestMethod.ALL,
    });
  }
}
