import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as C from '../../controllers';
import * as E from '../../entities';
import * as M from '../../modules';

@Module({
  imports: [
    HttpModule.register({
      withCredentials: true,
    }),
    TypeOrmModule.forFeature([E.User]),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  exports: [TypeOrmModule],
  controllers: [C.AuthController],
  providers: [],
})
export class AuthModule {}
