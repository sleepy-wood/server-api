import fs from 'fs';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { path } from 'app-root-path';
import { join } from 'path';
import { Repository } from 'typeorm';

import * as E from '../entities';
import * as U from '../utils';

/**
 * @author PIYoung
 * @createdAt 2022-10-15
 * @description 업로드 파일 삭제 스케쥴러
 * @runTime every day at 01:00
 * https://crontab.cronhub.io/
 */
@Injectable()
export class UploadsScheduler {
  constructor(
    @InjectRepository(E.AttachFile)
    private readonly attachFile: Repository<E.AttachFile>,
    private readonly configService: ConfigService,
  ) {}

  @Cron('0 1 * * *')
  handleCron() {
    // You can use an environment variable provided by PM2 itself called NODE_APP_INSTANCE which requires PM2 2.5.
    const nodeProcess = this.configService.get<number>('NODE_APP_INSTANCE');
    if (nodeProcess && nodeProcess !== 0) return;

    U.logger.warn(`Execute Uploads Scheduler ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);

    const tempPath = join(path, '/uploads/temp');
    const now = Date.now();
    const dayHour = 24 * 60 * 60 * 1 * 1000;
    const currFiles = fs.readdirSync(tempPath);

    if (currFiles.length === 1 && currFiles[0] === '.gitignore') {
      U.logger.warn('Nothing to Delete');
      return;
    }

    fs.readdir(tempPath, (err, files) => {
      files.forEach((filename) => {
        if (filename === '.gitignore') return;
        const split = filename.split('_');
        const past = Number(split[0]);
        const diff = now - past;
        const dbpPath = `/temp/${filename}`;
        const filePath = join(tempPath, filename);

        if (diff >= dayHour) {
          fs.unlink(filePath, (error) => {
            if (error) {
              U.logger.error(error);
              U.logger.warn(`Delete File ${filePath} Fail`);
              return;
            }

            this.attachFile.delete({ path: dbpPath }).catch((reason) => {
              U.logger.error(reason);
            });

            U.logger.warn(`Delete File ${filePath} Success`);
          });
        }
      });
    });

    U.logger.warn(`Done Uploads Scheduler ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);
  }
}
