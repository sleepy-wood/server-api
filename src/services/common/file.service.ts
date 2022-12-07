import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';
import { HttpException } from '../../exceptions';
import { request } from 'http';

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  path: string;
  size: number;
}

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(E.AttachFile)
    private readonly attachFile: Repository<E.AttachFile>,
  ) {}

  async upload(req: I.RequestWithUser, files: Array<Express.Multer.File>) {
    const fileList: Partial<E.AttachFile>[] = files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      path: `/temp/${file.filename}`,
      mimeType: file.mimetype,
      size: file.size,
      userId: req.user.id,
      type: I.AttachFileType.Temp,
    }));

    const { identifiers } = await this.attachFile.insert(fileList);

    return <I.BasicResponse<ObjectLiteral[]>>{
      result: true,
      data: identifiers,
    };
  }

  async imageToVideo(req: I.RequestWithUser, files: Array<Express.Multer.File>) {
    try {
      if (files && files.length > 0) {
        const file = files[0];
        const images = await U.unzip(file);
        const videoFilename = await U.imageToVideo(images);

        const attachFile = new E.AttachFile();
        attachFile.filename = videoFilename;
        attachFile.originalName = 'video.mp4';
        attachFile.path = `/temp/${videoFilename}`;
        attachFile.mimeType = 'video/mp4';
        attachFile.size = 100;
        attachFile.userId = req.user.id;
        attachFile.type = I.AttachFileType.Temp;

        return <I.BasicResponse<E.AttachFile>>{
          result: true,
          data: await this.attachFile.save(attachFile).catch((err) => {
            U.logger.error(err);
            throw new HttpException('COMMON_ERROR');
          }),
        };
      }
    } catch (err) {
      throw err;
    }
  }
}
