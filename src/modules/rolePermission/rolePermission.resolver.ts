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
import {RolePermission, RolePermissionInput} from './rolePermission.entity'
@Resolver('rolePermission')
export class RolePermissionResolver {
  constructor (
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: MongoRepository<RolePermission>
  ) {}
  
  @Query('rolePermissions')
  async roles() {
    return this.rolePermissionRepository.find()
  }

  @Query('rolePermission')
  async role(@Args('_id') _id: string): Promise<RolePermission> {
    try {
			const message = 'Not Found: RolePermission'
			const code = '404'
			const additionalProperties = {}

			const role = await this.rolePermissionRepository.findOne({_id})

			if (!role) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return role
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }

  @Mutation('createRolePermission')
  async createRole(@Args('input') input: RolePermissionInput): Promise<RolePermission> {
    const {idPermission, idRole} = input
    const rolePermission = new RolePermission()
    rolePermission.idPermission = idPermission
    rolePermission.idRole = idRole
    return await this.rolePermissionRepository.save(rolePermission)
  }

  @Mutation('deleteRolePermission')
  async deleteRole(@Args('_id') _id: string): Promise<Boolean> {
    return await this.rolePermissionRepository.deleteOne({_id}) ? true : false 
  }

}

