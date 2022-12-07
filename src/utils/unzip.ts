import fs from 'fs';
import yauzl from 'yauzl';
import { randomBytes } from 'crypto';
import { path } from 'app-root-path';
import { join } from 'path';

import * as U from '.';

export const unzip = (file: Express.Multer.File): Promise<string[]> => {
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

      const filenames: string[] = [];
      zipFile.on('entry', (entry) => {
        zipFile.openReadStream(entry, (err, readStream) => {
          if (err) {
            U.logger.error(err);
            return reject(err);
          }

          const ran = `sleepywood_${randomBytes(16).toString('hex')}`;
          const arr = entry.fileName.split('.');
          const ext = arr.length === 1 ? '' : '.' + arr[arr.length - 1];
          const fileName = Date.now() + '_' + ran + ext;

          if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            const dest = join(path, `uploads/temp/${fileName}`);
            const file = fs.createWriteStream(dest);
            filenames.push(dest);

            readStream.pipe(file);
            readStream.on('end', () => {});
          }
        });
      });

      zipFile.on('end', () => {
        resolve(filenames);
      });
    });
  });
};
