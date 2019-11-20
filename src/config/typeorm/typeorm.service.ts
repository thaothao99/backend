import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { getMetadataArgsStorage } from 'typeorm'

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		return {
			type: 'mongodb',
      url: 'mongodb+srv://sa:qsWGRPWsrfwipbei@cluster0-fpeww.mongodb.net/admin?retryWrites=true&w=majority',
      database: "test123456",
			entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
			synchronize: true,
			useNewUrlParser: true,
			logging: true
		}
	}
}