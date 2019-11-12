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
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { Role } from './modules/role/role.entity';
import { RolePermissionModule } from './modules/rolePermission/rolePermission.module';
import { Permission } from './modules/permission/permission.entity';
import { RolePermission } from './modules/rolePermission/rolePermission.entity';
import { PetModule } from './modules/pet/pet.module';

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
    hasPermission: async (next, source, args, ctx) => {
      const { code } = args
      const { currentUser } = ctx

      if (!currentUser) {
        throw new Error('You are not authenticated!')
      }
      const permisisonRequired = await getMongoRepository(Permission).findOne({code})
      // console.log(permisisonRequired, currentUser )
      const rolePermissionRequired = await getMongoRepository(RolePermission).findOne({
        idRole: currentUser.role._id, 
        idPermission: permisisonRequired._id
      })
      // console.log(rolePermissionRequired)
      if (!rolePermissionRequired) {
        throw new Error(
          `You don't have role!`
        )
      }
      return next()
  },
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
        //console.log(currentUser)
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
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    PetModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}