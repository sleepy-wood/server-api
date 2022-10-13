import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import * as C from '@controller/index';
import * as M from '@module/index';
import * as MW from '@middleware/index';
import * as S from '@service/index';

@Module({
  imports: [forwardRef(() => M.ServiceModule), forwardRef(() => M.UtilModule)],
  controllers: [C.FileController],
  providers: [S.FileService],
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MW.AuthMiddleware)
      .forRoutes({
        path: 'v1/files/temp/upload',
        method: RequestMethod.ALL,
      })
      .apply(MW.SupervisorMiddleware)
      .forRoutes({
        path: 'v1/files/temp/upload-supervisor',
        method: RequestMethod.ALL,
      });
  }
}
