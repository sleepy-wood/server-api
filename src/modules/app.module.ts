import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { path } from 'app-root-path';
import { Response } from 'express';
import Redis from 'ioredis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { join } from 'path';

import * as E from '../entities';
import { HttpExceptionFilter } from '../exceptions';
import * as M from '../modules';
import * as SCH from '../schedulers';
import * as U from '../utils';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { username, host, dbname, password, port } = process.env.DB_SECRET ? JSON.parse(process.env.DB_SECRET) :
          {
            host: configService.get<string>('MYSQL_HOST'),
            port: configService.get<number>('MYSQL_PORT'),
            username: configService.get<string>('MYSQL_USER'),
            password: configService.get<string>('MYSQL_PASSWORD'),
            dbname: configService.get<string>('MYSQL_DATABASE'),
          }
        return {
          type: 'mysql',
          host: host,
          port: port,
          username: username,
          password: password,
          database: dbname,
          entities: [...Object.entries(E).map(([name, entity]) => entity)], // [join(path, '/entities/**/*.entity.ts')],
          logger: new U.TypeOrmLogger(),
          timezone: '+09:00',
          charset: 'utf8mb4_unicode_ci',
          autoLoadEntities: true,
          synchronize: false, // never use this in production
        }
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('THROTTLE_TTL'),
        limit: configService.get<number>('THROTTLE_LIMIT'),
        storage: new ThrottlerStorageRedisService(
          new Redis(configService.get<number>('REDIS_PORT'), configService.get<string>('REDIS_HOST')),
        ),
      }),
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(path, 'uploads/temp'),
        serveRoot: '/temp',
        serveStaticOptions: {
          index: false,
          redirect: false,
        },
      },
      {
        rootPath: join(path, 'uploads/static'),
        serveRoot: '/public',
        serveStaticOptions: {
          index: false,
          redirect: false,
          setHeaders: (res: Response, _path, stat) => {
            U.logger.log(`${res.req.socket.remoteAddress} [ServeStaticModule]: ${_path}`);
          },
        },
      },
    ),
    ScheduleModule.forRoot(),
    ...Object.entries(M)
      .filter(([name, module]) => name !== 'AppModule')
      .map(([name, module]) => module),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ...Object.entries(SCH).map(([name, module]) => module),
  ],
  exports: [],
})
export class AppModule { }
