import Redis from 'ioredis';
import morgan from 'morgan';
import moment from 'moment-timezone';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { path } from 'app-root-path';
import { Response } from 'express';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { join } from 'path';

import * as E from '@exception/index';
import * as M from '@module/index';
import * as Models from '@model/index';
import * as SCH from '@scheduler/index';
import * as U from '@util/index';
import { WebsocketModule } from '../websocket/ws.module';

// GraphQL Test Module (Never Use)
import { RecipesModule } from './recipes/recipes.module';

morgan.token('date', (req, res, tz) => moment().tz('Asia/Seoul').format('YYYY/MM/DD HH:mm:ss'));
morgan.format(
  'sunflower-care',
  ':remote-addr [:date[Asia/Seoul]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
);

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        models: Object.entries(Models).map(([key, value]) => value),
        // sync: { alter: true, force: false },
        // logging: (sql) => U.logger.log(sql),
        logging: false,
        timezone: '+09:00',
        autoLoadModels: true, // If true, models will be loaded automatically (default: false)
        synchronize: true, // If true, automatically loaded models will be synchronized (default: true)
        define: {
          charset: 'utf8mb4',
          collate: 'utf8mb4_unicode_ci',
        },
      }),
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
        rootPath: join(path, 'public'),
        exclude: ['/sunflower-care*', '/temp*', '/public*', '/graphql*', '/chat*', '/supervisor*'],
        serveStaticOptions: {
          index: false,
          redirect: false,
          setHeaders: (res: Response, _path, stat) => {
            U.logger.log(`${res.req.socket.remoteAddress} [ServeStaticModule]: ${_path}`);
          },
        },
      },
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
        },
      },
    ),
    WebsocketModule,
    ScheduleModule.forRoot(),
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
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
      useClass: E.HttpExceptionFilter,
    },
    ...Object.entries(SCH).map(([name, module]) => module),
  ],
  exports: [],
})
export class AppModule {}
