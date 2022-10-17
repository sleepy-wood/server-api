import * as morgan from 'morgan';
import * as redisCacheStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utcToZonedTime, format } from 'date-fns-tz';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import * as U from '../utils';

morgan.token('date', (req, res, tz) => {
  const timezone = 'Asia/Seoul';
  const date = new Date();
  const zonedDate = utcToZonedTime(date, timezone);
  const formatString = 'YYYY-MM-DD HH:mm:ss';
  return format(zonedDate, formatString, { timeZone: timezone });
});
morgan.format(
  'sleepy-wood',
  ':remote-addr [:date[Asia/Seoul]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MorganModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisCacheStore.create({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        }) as CacheStore,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined', {
        stream: {
          write: (message: string) => {
            U.logger.log(message.substring(0, message.lastIndexOf('\n')));
          },
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class GlobalModule {}
