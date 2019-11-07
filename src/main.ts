import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const port = process.env.PORT || 3000;
declare const module: any;
var corsOptions = {
  origin: 'http://localhost:3030',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cors(corsOptions))

  // app.use(json({ limit: '10mb' }))
  // app.use(urlencoded({ limit: '10mb', extended: true }))
  // app.use(helmet())

  // app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  Logger.log(`🚀 Server running on http://localhost:${port}/graphql `, 'Bootstrap');
}
bootstrap();