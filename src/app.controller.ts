import { Controller, Get, Post, UseInterceptors, UploadedFile, Headers, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter  } from './utils/imageFileFilter';
import { editFileName  } from './utils/editFileName';
import * as jwt from 'jsonwebtoken';
import { getMongoRepository } from 'typeorm';
import { User } from './modules/user/user.entity';
import { ApolloError } from 'apollo-server-core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
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
  async uploadedFile(@UploadedFile() file, @Headers() headers: any) {
    const { token } = headers
    let currentUser;
    if(!token) return 'You are not authenticated!'
    if (token) {
      const message = 'Invalid Token'
      const code = '498'
      const additionalProperties = {}
      try {
        let decodeToken
        decodeToken = await jwt.verify(token, process.env.JWT_SECRET)
        const _id = decodeToken.id
        //  console.log(decodeToken)
        currentUser = await getMongoRepository(User).findOne({_id})
      } catch (error) {
        throw new ApolloError(message, code, additionalProperties)
      }
    }
    const response = {
      filename: file.filename,
    };
    return response;
  }
  @Get('/files/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
