import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Tree]),
    TypeOrmModule.forFeature([E.TreeAttachment]),
    TypeOrmModule.forFeature([E.TreeGrowth]),
    TypeOrmModule.forFeature([E.TreePipeline]),
    forwardRef(() => M.FileModule),
    forwardRef(() => M.HealthModule),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.TreeService, S.TreeGrowthService, S.TreePipelineService],
  providers: [S.TreeService, S.TreeGrowthService, S.TreePipelineService],
  controllers: [C.TreeController, C.TreeGrowthController],
})
export class TreeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/tree*',
      method: RequestMethod.ALL,
    });
  }
}
