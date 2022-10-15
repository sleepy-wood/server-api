import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import * as C from '../controllers';
import * as M from '../modules';
import * as MW from '../middlewares';
import * as S from '../services';

@Module({
  imports: [forwardRef(() => M.UtilModule)],
  controllers: [C.FileController],
  providers: [S.FileService],
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MW.AuthMiddleware).forRoutes({
      path: 'v1/files/temp/upload',
      method: RequestMethod.ALL,
    });
  }
}
