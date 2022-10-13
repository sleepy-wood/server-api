import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';

import * as M from '@model/index';
import * as U from '@util/index';

/**
 * @author PIYoung
 * @createdAt 2021-12-
 * @description DB 소프트 삭제 후 1년 지난 데이터 완전 삭제
 * @runTime every day at 02:00
 * https://crontab.cronhub.io/
 */
@Injectable()
export class DBScheduler {
  constructor(private readonly configService: ConfigService) {}

  @Cron('0 2 * * *')
  handleCron() {
    // You can use an environment variable provided by PM2 itself called NODE_APP_INSTANCE which requires PM2 2.5.
    const nodeProcess = this.configService.get<number>('NODE_APP_INSTANCE');
    if (nodeProcess && nodeProcess !== 0) return;

    U.logger.warn(`Execute DB Scheduler ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);

    U.logger.warn(`Done DB Scheduler ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);
  }
}
