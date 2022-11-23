import fs from 'fs';
import yauzl from 'yauzl';
import { path } from 'app-root-path';
import { join } from 'path';

import * as U from '.';

export const unzip = (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    yauzl.open(join(path, `uploads/temp/${file.filename}`), (err, zipFile) => {
      if (err) {
        U.logger.error(err);
        return reject(err);
      }

      zipFile.on('error', (err) => {
        U.logger.error(err);
        return reject(err);
      });

      zipFile.on('entry', (entry) => {
        zipFile.openReadStream(entry, (err, readStream) => {
          if (err) {
            U.logger.error(err);
            return reject(err);
          }

          const dest = join(path, `uploads/temp/${entry.fileName}`);
          const file = fs.createWriteStream(dest);
          readStream.pipe(file);
          readStream.on('end', () => {
            U.logger.log(`${entry.fileName} extracted`);
            resolve(true);
          });
        });
      });
    });
  });
};
