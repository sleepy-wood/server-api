import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as E from '../../entities';
import * as I from '../../interfaces';

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
      fileName: file.filename,
      originalName: file.originalname,
      path: `/temp/${file.filename}`,
      mimeType: file.mimetype,
      size: file.size,
      userId: req.user.id,
    }));

    await this.attachFile.insert(fileList);

    return <I.BasicResponse<File[]>>{
      result: true,
      data: files.map((file) => {
        delete file.destination;
        file.path = `/temp/${file.filename}`;
        return file;
      }),
    };
  }
}
