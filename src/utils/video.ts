import ffmpeg from 'fluent-ffmpeg';
import videoshow from 'videoshow';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
import { randomBytes } from 'crypto';
import { path } from 'app-root-path';
import { join } from 'path';

import * as U from '.';
import { HttpException } from '../exceptions';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const videoOption = {
  fps: 25,
  loop: 0.05,
  transition: false,
  videoBitrate: 1024,
  format: 'mp4',
  pixelFormat: 'yuv420p',
};

export const imageToVideo = (images: string[]): Promise<string> => {
  const ran = `sleepywood_${randomBytes(16).toString('hex')}`;
  const filename = Date.now() + '_' + ran + '.mp4';

  return new Promise((resolve, reject) => {
    try {
      videoshow(images, videoOption)
        .save(join(path, `uploads/temp/${filename}`))
        .on('start', function (command) {})
        .on('error', function (err, stdout, stderr) {
          U.logger.error(err);
          reject(new HttpException('COMMON_ERROR'));
        })
        .on('end', function (output) {
          resolve(filename);
        });
    } catch (err) {
      console.log(err);
    }
  });
};
