import { Controller, Post, UseInterceptors, UploadedFiles, HttpCode, Req, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { path } from 'app-root-path';
import { randomBytes } from 'crypto';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';

import * as I from '../../interfaces';
import { StatusCodes } from '../../constants';
import { HttpException } from '../../exceptions';
import { FileService } from '../../services';

@ApiBearerAuth()
@ApiTags('files')
@Controller({
  path: 'files',
  version: '1',
})
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: '파일 업로드',
    description: `<p><font color="red"><strong>*** temp파일 ***</strong></font></p><p>최대 업로드 개수: 10</p><p>최대 용량(개당): 40mb</p>`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
          cb(null, join(path, 'uploads/temp'));
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {
          const ran = `sleepywood_${randomBytes(16).toString('hex')}`;
          const arr = file.originalname.split('.');
          const ext = arr.length === 1 ? '' : '.' + arr[arr.length - 1];
          const fileName = Date.now() + '_' + ran + ext;
          cb(null, fileName);
        },
      }),
      limits: {
        fileSize: 40 * 1024 * 1024, // 40mb
        fieldNameSize: 10 * 1024, // 10kb
      },
      fileFilter: (req: I.RequestWithUser, file, cb) => {
        cb(null, true);
      },
    }),
  )
  @HttpCode(StatusCodes.OK)
  @Post('temp/upload')
  async uploadFile(@Req() req: I.RequestWithUser, @UploadedFiles() files: Array<Express.Multer.File>) {
    if (!req.user) throw new HttpException('COMMON_ERROR');
    return await this.fileService.upload(req, files);
  }

  @ApiOperation({
    summary: '이미지 압축 파일 비디오로 변환',
    description: `<p><font color="red"><strong>*** temp파일 ***</strong></font></p><p>최대 업로드 개수: 10</p><p>최대 용량(개당): 50mb</p>`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
          cb(null, join(path, 'uploads/temp'));
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {
          const ran = `sleepywood_${randomBytes(16).toString('hex')}`;
          const arr = file.originalname.split('.');
          const ext = arr.length === 1 ? '' : '.' + arr[arr.length - 1];
          const fileName = Date.now() + '_' + ran + ext;
          cb(null, fileName);
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100mb
        fieldNameSize: 10 * 1024, // 10kb
      },
      fileFilter: (req: I.RequestWithUser, file, cb) => {
        cb(null, true);
      },
    }),
  )
  @HttpCode(StatusCodes.OK)
  @Post('temp/image-to-video')
  async uploadImageZipToVideo(@Req() req: I.RequestWithUser, @UploadedFiles() files: Array<Express.Multer.File>) {
    if (!req.user) throw new HttpException('COMMON_ERROR');
    return await this.fileService.imageToVideo(req, files);
  }
}
