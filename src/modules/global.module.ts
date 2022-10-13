import morgan from 'morgan';
import moment from 'moment-timezone';
import redisCacheStore from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import * as U from '@util/index';

morgan.token('date', (req, res, tz) => moment().tz('Asia/Seoul').format('YYYY/MM/DD HH:mm:ss'));
morgan.format(
  'sunflower-care',
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
      useFactory: (configService: ConfigService) => ({
        store: redisCacheStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
        limiter: {
          max: 10,
          duration: 1000,
        },
        prefix: 'sunflower-care-queues',
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('sunflower-care', {
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
