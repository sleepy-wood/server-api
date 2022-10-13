import fs from 'fs';
import { path } from 'app-root-path';
import { join } from 'path';

import * as U from '@util/index';
import { HttpException } from '@exception/index';

// move file
export const moveFile = (from: string | string[], to: string | string[]) => {
  try {
    if (Array.isArray(from) && Array.isArray(to)) for (let i = 0; i < from.length; i++) doMove(from[i], to[i]);
    else if (typeof from === 'string' && typeof to === 'string') doMove(from, to);
    else U.logger.error('moveFile parameters wrong!');
  } catch (error) {
    U.logger.error(error);
    throw new HttpException('UPLOADS_FILE_FAIL');
  }

  function doMove(_from: string, _to: string) {
    const oldPath = join(path, 'uploads', _from);
    const newPath = join(path, 'uploads', _to);

    fs.renameSync(oldPath, newPath);
  }
};
