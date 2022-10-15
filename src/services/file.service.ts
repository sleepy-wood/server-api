import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import * as I from '../interfaces';
import * as M from '../entities';

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
    @InjectModel(M.AttachFile)
    private readonly attachFile: typeof M.AttachFile,
  ) {}

  async upload(req: I.RequestWithUser, files: Array<Express.Multer.File>) {
    const fileList: Partial<M.AttachFile>[] = files.map((file) => ({
      fileName: file.filename,
      originalName: file.originalname,
      path: `/temp/${file.filename}`,
      mimeType: file.mimetype,
      size: file.size,
      ...('user' in req ? { userId: req.user.id } : 'supervisor' in req ? { supervisorId: req.supervisor.id } : {}),
    }));

    await this.attachFile.bulkCreate(fileList, { transaction: req.transaction });

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
