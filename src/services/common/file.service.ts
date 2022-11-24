import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

import * as E from '../../entities';
import * as I from '../../interfaces';
import * as U from '../../utils';

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
    const file = files[0];
    const result = await U.unzip(file);
    return {
      result: true,
    };
  }
}
