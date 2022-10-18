import * as os from 'os';
import cluster from 'cluster';
import { Injectable } from '@nestjs/common';

import * as U from '../utils';

const numCPUs = os.cpus().length;

@Injectable()
export class ClusterService {
  static init(callback: Function): void {
    if (cluster.isMaster) {
      U.logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        U.logger.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      U.logger.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
