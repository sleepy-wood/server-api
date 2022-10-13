import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import * as C from '@controller/index';
import * as M from '@module/index';
import * as Models from '@model/index';
import * as MW from '@middleware/index';
import * as S from '@service/index';

@Module({
  imports: [
    SequelizeModule.forFeature([Models.AttachFile]),
    SequelizeModule.forFeature([Models.VerifyToken]),
    forwardRef(() => M.UtilModule),
  ],
  controllers: [C.ServiceController],
  providers: [S.AttachFileService, S.SunflowerService, S.VerifyCodeService],
  exports: [SequelizeModule, S.AttachFileService, S.SunflowerService, S.VerifyCodeService],
})
export class ServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.SecureFileMiddleware).forRoutes({
      path: 'v1/services/secure/:path',
      method: RequestMethod.GET,
    });
  }
}
