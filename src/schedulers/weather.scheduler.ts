import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import qs from 'qs';
import * as Redis from 'redis';
import { Repository } from 'typeorm';

import * as E from '../entities';
import * as U from '../utils';

const weatherCategory = {
  '0': '맑음',
  '1': '비',
  '2': '비/눈',
  '3': '눈',
  '4': '소나기',
};

/**
 * @author PIYoung
 * @createdAt 2022-11
 * @description 매 정각마다 날씨 정보를 가져와서 DB에 저장
 * @runTime Every hour
 * https://crontab.cronhub.io/
 */
@Injectable()
export class WeatherScheduler {
  private redClient: Redis.RedisClientType<any>;
  private redPrefix: string;

  constructor(
    @InjectRepository(E.Weather)
    private readonly weather: Repository<E.Weather>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.redClient = Redis.createClient({
      socket: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
      }
    });
    this.redPrefix = 'weather_';
  }

  async onModuleInit() {
    await this.redClient.connect();
  }

  // @Cron('*/5 * * * * *')
  @Cron('50 * * * *')
  async handleCron() {
    const baseDate = moment(new Date()).format('YYYYMMDD'); // '20220513',
    const baseTime = moment(new Date()).format('HH00'); // '0600',

    if (await this.redClient.getSet(`${this.redPrefix}_time`, baseTime) == baseTime) return;

    U.logger.warn(`Execute Weather Scheduler ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);

    const serviceKey = this.configService.get<string>('WEATHER_API_KEY');
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    const params = {
      serviceKey,
      pageNo: '1',
      numOfRows: '1000',
      dataType: 'JSON',
      base_date: baseDate,
      base_time: baseTime,
      nx: '58',
      ny: '126',
    };

    const { data } = await this.httpService.axiosRef.get(`${url}?${qs.stringify(params)}`);
    const { response } = data;
    const { header, body } = response;
    const { resultCode, resultMsg } = header;
    if (resultCode !== '00') {
      U.logger.error(`Weather API Error ${resultMsg}`);
      return;
    }

    const { items } = body;
    const { item } = items;

    // 강수형태(PTY) 코드 :
    // (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
    // (단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
    for (const i of item) {
      const { category, obsrValue } = i;
      if (category === 'PTY') {
        const weather = weatherCategory[obsrValue];

        await this.weather.save({
          weather,
          time: baseTime,
        });
      }
    }

    U.logger.warn(`Done Weather Scheduler ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);
  }
}
