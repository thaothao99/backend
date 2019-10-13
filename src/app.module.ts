import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
// import { getMetadataArgsStorage } from 'typeorm'
import { TypeormModule } from './config/typeorm/typeorm.module'
import { TypeormService } from './config/typeorm/typeorm.service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      debug: false,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
			useClass: TypeormService
		}),
    /* TypeOrmModule.forRoot({
      type: "mongodb",
      url:"mongodb+srv://sa:qsWGRPWsrfwipbei@cluster0-fpeww.mongodb.net/admin?retryWrites=true&w=majority",
      database: "test", 
			entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }), */
    UserModule,
    TypeormModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}