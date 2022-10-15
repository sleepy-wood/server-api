import { Module } from '@nestjs/common';

import * as S from '../services';

@Module({
  providers: [S.JWTService],
  exports: [S.JWTService],
})
export class UtilModule {}
