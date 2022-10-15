import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../controllers';
import * as M from '../modules';
import * as Models from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Models.User]),
    forwardRef(() => M.ServiceModule),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  controllers: [C.AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
