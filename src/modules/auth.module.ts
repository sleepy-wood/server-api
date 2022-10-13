import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import * as C from '@controller/index';
import * as M from '@module/index';
import * as Models from '@model/index';

@Module({
  imports: [
    SequelizeModule.forFeature([Models.Supervisor]),
    SequelizeModule.forFeature([Models.User]),
    forwardRef(() => M.SupervisorModule),
    forwardRef(() => M.ServiceModule),
    forwardRef(() => M.UserModule),
    forwardRef(() => M.UtilModule),
  ],
  controllers: [C.AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
