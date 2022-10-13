import { Module } from '@nestjs/common';

import * as S from '@service/index';

@Module({
  providers: [S.JWTService, S.SMSService],
  exports: [S.JWTService, S.SMSService],
})
export class UtilModule {}
