import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
// import { getMetadataArgsStorage } from 'typeorm'
import { TypeormModule } from './config/typeorm/typeorm.module'
import { TypeormService } from './config/typeorm/typeorm.service'
import { AuthenticationError } from 'apollo-server-express';
import { ApolloError } from 'apollo-server-core'

import * as jwt from 'jsonwebtoken';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { User } from './modules/user/user.entity';

const directiveResolvers = {
  isAuthenticated: (next, source, args, ctx) => {
    const message = 'Token Required'
				const code = '499'
				const additionalProperties = {}

        const { currentUser } = ctx
				if (!currentUser) {
					throw new ApolloError(message, code, additionalProperties)
				}
				return next()
    },
  /* hasRole: (next, source, { role }, ctx) => {
    const { currentUser } = ctx
    if ('admin' === currentUser.role) return next();
    throw new Error(`Must have role: ${role}, you have role: ${currentUser.role}`);
  }, */
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      directiveResolvers,
      context: async ({ req, res }) => {
        let currentUser;

        const { token } = req.headers;
        // const service = this.authService.hello();
        // console.log(service);
        if (token) {
          const message = 'Invalid Token'
					const code = '498'
					const additionalProperties = {}
          try {
						let decodeToken
            decodeToken = await jwt.verify(token, process.env.JWT_SECRET)
            const _id = decodeToken.id
            currentUser = await getMongoRepository(User).findOne(_id)
            console.log(decodeToken)
					} catch (error) {
						throw new ApolloError(message, code, additionalProperties)
          }
        }

        return {
          req,
          res,
          currentUser
        };
      },
      debug: false,
      playground: true
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
    TypeormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}