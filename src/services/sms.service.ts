import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as I from '@interface/index';
import * as U from '@util/index';
import * as M from '@model/index';
import { HttpException } from '@exception/index';

@Injectable()
export class SMSService {
  constructor(private readonly configService: ConfigService) {}

  sendAuthSMS = (hp: Array<string>, text: string) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.configService.get('SMS_HOST')}sms/v2.3/appKeys/${this.configService.get('SMS_API')}/sender/auth/sms`,
          {
            body: text,
            sendNo: this.configService.get('SMS_SEND_NUM'),
            recipientList: hp.map((num) => {
              return { recipientNo: num };
            }),
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
          },
        )
        .then((response: any) => {
          if (response.data.header.isSuccessful) resolve(response.data);
          else reject(response.data);
        })
        .catch((error) => {
          U.logger.error(error);
          reject(error);
        });
    });
  };

  sendSMS = (hp: Array<string>, text: string) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.configService.get('SMS_HOST')}sms/v2.3/appKeys/${this.configService.get('SMS_API')}/sender/sms`,
          {
            body: text,
            sendNo: this.configService.get('SMS_SEND_NUM'),
            recipientList: hp.map((num) => {
              return { recipientNo: num };
            }),
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
          },
        )
        .then(function (response: any) {
          if (response.data.header.isSuccessful) resolve(response.data);
          else reject(response.data);
        })
        .catch(function (error) {
          U.logger.error(error);
          reject(error);
        });
    });
  };

  verifyToken(token: string): [I.DataStoredInToken, HttpException] {
    try {
      const secret = this.configService.get<string>('SECRET');
      const verificationResponse = jwt.verify(token, secret) as I.DataStoredInToken;
      return [verificationResponse, null];
    } catch (err) {
      U.logger.error(err);
      return [null, new HttpException('INVALID_TOKEN')];
    }
  }

  getJWTToken(user: M.User | M.Supervisor): [string, HttpException] {
    try {
      const secret = this.configService.get<string>('SECRET');
      const dataStoredInToken: I.DataStoredInToken = { id: user.id };
      const expiresIn: number = 31557600000; // 1y

      return [jwt.sign(dataStoredInToken, secret, { expiresIn }), null];
    } catch (err) {
      U.logger.error(err);
      return [null, new HttpException('INVALID_TOKEN')];
    }
  }
}
