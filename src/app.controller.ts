import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Res, UploadedFiles } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter  } from './utils/imageFileFilter';
import { editFileName  } from './utils/editFileName';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("hi")
    return this.appService.getHello();
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    console.log(file)
    const response = {
      filename: file.filename,
    };
    return response;
  }
}
