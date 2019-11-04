import {
	Resolver,
	Query,
	Args,
	Mutation,
	Subscription,
	Context
} from '@nestjs/graphql'
import { MongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {Permission, PermissionInput} from './permission.entity'
@Resolver('permission')
export class PermissionResolver {
  constructor (
    @InjectRepository(Permission)
    private readonly permissionRepository: MongoRepository<Permission>
  ) {}
  
  @Query('permissions')
  async permissions() {
    return this.permissionRepository.find()
  }

  @Query('permission')
  async permission(@Args('_id') _id: string): Promise<Permission> {
    try {
			const message = 'Not Found: Permission'
			const code = '404'
			const additionalProperties = {}

			const permission = await this.permissionRepository.findOne({_id})

			if (!permission) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return permission
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }

  @Mutation('createPermission')
  async createPermission(@Args('input') input: PermissionInput): Promise<Permission> {
    const {code, name} = input
    const message = 'Permission has already existed!'
    const existedPermission = await this.permissionRepository.findOne({code, name})
    if(existedPermission){
      throw new Error(message)
    }
    const permission = new Permission()
    permission.code = code
    permission.name = name
    return await this.permissionRepository.save(permission)
  }

  @Mutation('updatePermission')
  async updatePermission(
    @Args('_id') _id: string,
    @Args('input') input: PermissionInput
  ): Promise<boolean> {
    const { code, name } = input
    const message = 'Not Found: Permission'
    const existedPermission = await this.permissionRepository.findOne({ _id })
    if (!existedPermission) {
			throw new Error(message)
		}
    existedPermission.code = code
    existedPermission.name = name
    return (await this.permissionRepository.save(existedPermission)) ? true : false
  }

  @Mutation('deletePermission')
  async deletePermission(@Args('_id') _id: string): Promise<Boolean> {
    return await this.permissionRepository.deleteOne({_id}) ? true : false 
  }

}

