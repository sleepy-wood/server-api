import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import * as C from '@controller/index';
import * as M from '@module/index';
import * as Models from '@model/index';
import * as MW from '@middleware/index';
import * as S from '@service/index';

@Module({
  imports: [
    SequelizeModule.forFeature([Models.ConsultingMember]),
    SequelizeModule.forFeature([Models.ConsultingRoom]),
    SequelizeModule.forFeature([Models.Supervisor]),
    forwardRef(() => M.CareApplicationModule),
    forwardRef(() => M.CareGiverRegistrationModule),
    forwardRef(() => M.CareGiverReviewModule),
    forwardRef(() => M.RApplicationRegistrationModule),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  controllers: [C.SupervisorController, C.DashBoardController, C.StatisticsController],
  providers: [S.SupervisorService],
  exports: [SequelizeModule, S.SupervisorService],
})
export class SupervisorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.SupervisorMiddleware).forRoutes({
      path: 'v1/supervisors*',
      method: RequestMethod.ALL,
    });
  }
}
