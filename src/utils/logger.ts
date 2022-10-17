import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { path } from 'app-root-path';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { join } from 'path';

const { combine, timestamp, printf } = winston.format;
const isTest = process.env.NODE_ENV === 'test';
const logDir = join(path, 'logs');
const logFormat = printf(({ _timestamp, level, message }) => `${_timestamp} ${level}: ${message}`);
const timezone = () => {
  return new Date().toLocaleString(process.env.locale, {
    timeZone: process.env.TZ,
  });
};

export const logger = WinstonModule.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp({ format: timezone }),
        nestWinstonModuleUtilities.format.nestLike('sleepy-wood'),
      ),
      silent: isTest,
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/info`,
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
      format: nestWinstonModuleUtilities.format.nestLike('sleepy-wood'),
      silent: isTest,
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
      format: nestWinstonModuleUtilities.format.nestLike('sleepy-wood'),
      silent: isTest,
    }),
    new winston.transports.DailyRotateFile({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/warn`,
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
      format: nestWinstonModuleUtilities.format.nestLike('sleepy-wood'),
      silent: isTest,
    }),
  ],
});
