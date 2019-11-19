import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
declare const module: any;
var allowedOrigins = [`http://localhost:3030`, `http://localhost:3000`, `https://petsoredemo.azurewebsites.net/`];

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule)
//   app.enableCors({
//     origin: function(origin, callback){
//       // allow requests with no origin 
//       // (like mobile apps or curl requests)

//       console.log(allowedOrigins.indexOf(origin), ori)
//       if(!origin) return callback(null, true);
//       if(allowedOrigins.indexOf(origin) === -1){
//         var msg = 'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   });
const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true,
}
async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: options,
		logger: true
  })
  
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