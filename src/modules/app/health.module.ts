import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';
import * as MW from '../../middlewares';
import * as S from '../../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([E.Activity]),
    TypeOrmModule.forFeature([E.Heart]),
    TypeOrmModule.forFeature([E.Oxygen]),
    TypeOrmModule.forFeature([E.Respiratory]),
    TypeOrmModule.forFeature([E.Sleep]),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule, S.ActivityService, S.HeartService, S.OxygenService, S.RespiratoryService, S.SleepService],
  providers: [S.ActivityService, S.HeartService, S.OxygenService, S.RespiratoryService, S.SleepService],
  controllers: [
    C.ActivityController,
    C.HeartController,
    C.OxygenController,
    C.RespiratoryController,
    C.SleepController,
  ],
})
export class HealthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/activities*',
      method: RequestMethod.ALL,
    });
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/heart*',
      method: RequestMethod.ALL,
    });
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/oxygen*',
      method: RequestMethod.ALL,
    });
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/respiratory*',
      method: RequestMethod.ALL,
    });
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/sleeps*',
      method: RequestMethod.ALL,
    });
  }
}
