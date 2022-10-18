import { Logger, QueryRunner } from 'typeorm';

import { logger } from './logger';

export class TypeOrmLogger implements Logger {
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    switch (level) {
      case 'log':
        logger.log(message);
        break;
      case 'info':
        logger.debug(message);
        break;
      case 'warn':
        logger.warn(message);
        break;
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    logger.log(message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    logger.log('query' + ': ' + sql);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    logger.log(`query failed: ` + sql);
    logger.log(`error:`, error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    logger.log(`query is slow: ` + sql);
    logger.log(`execution time: ` + time);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    logger.log(message);
  }

  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      return parameters;
    }
  }
}
