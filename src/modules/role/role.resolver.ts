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
import {Role, RoleInput} from './role.entity'
import M = require('minimatch')
@Resolver('role')
export class RoleResolver {
  constructor (
    @InjectRepository(Role)
    private readonly roleRepository: MongoRepository<Role>
  ) {}
  
  @Query('roles')
  async roles() {
    return this.roleRepository.find()
  }

  @Query('role')
  async role(@Args('_id') _id: string): Promise<Role> {
    try {
			const message = 'Not Found: Role'
			const code = '404'
			const additionalProperties = {}

			const user = await this.roleRepository.findOne({_id})

			if (!user) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return user
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }

  @Mutation('createRole')
  async createRole(@Args('input') input: RoleInput): Promise<Role> {
    const {code, name} = input
    const role = new Role()
    role.code = code
    role.name = name
    return await this.roleRepository.save(role)
  }

  @Mutation('updateRole')
  async updateRole(
    @Args('_id') _id: string,
    @Args('input') input: RoleInput
  ): Promise<boolean> {
    try {
      const updatedRole = await this.roleRepository.findOneAndUpdate(
        { _id},
        { $set: { ...input } },
        { returnOriginal: false }
      )
      return (await this.roleRepository.save(updatedRole.value)) ? true : false
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation('deleteRole')
  async deleteRole(@Args('_id') _id: string): Promise<Boolean> {
    return await this.roleRepository.deleteOne({_id}) ? true : false 
  }

}

