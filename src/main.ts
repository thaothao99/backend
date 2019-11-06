import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: false,
    logger: false
  })
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
  await app.listen(port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  Logger.log(`🚀 Server running on http://localhost:${port}/graphql `, 'Bootstrap');
}
bootstrap();