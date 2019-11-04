import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {Role, RoleInput} from './role.entity'
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

			const role = await this.roleRepository.findOne({_id})

			if (!role) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return role
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }

  @Mutation('createRole')
  async createRole(@Args('input') input: RoleInput): Promise<Role> {
    const {code, name} = input
    const message = 'Role has already existed!'
    const existedRole = await this.roleRepository.findOne({code, name})
    if(existedRole){
      throw new Error(message)
    }
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
    const { code, name } = input
    const message = 'Not Found: Role'
    const existedRole = await this.roleRepository.findOne({ _id })
    if (!existedRole) {
			throw new Error(message)
		}
    existedRole.code = code
    existedRole.name = name
    return (await this.roleRepository.save(existedRole)) ? true : false
  }

  @Mutation('deleteRole')
  async deleteRole(@Args('_id') _id: string): Promise<Boolean> {
    return await this.roleRepository.deleteOne({_id}) ? true : false 
  }

}

