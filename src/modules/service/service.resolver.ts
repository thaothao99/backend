import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {Service} from './service.entity'


@Resolver('Service')
export class ServiceResolver {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: MongoRepository<Service>
  ){}
  @Query('services')
  async services(){
    return await this.serviceRepository.find()
  }
  @Query('minAmount')
  async minAmount() {
    const arr = await await this.serviceRepository.find()
    let min = arr[0].amount
    arr.forEach(i=>{
      if(i.amount<min) min = i.amount
    })
    return min
  }
  @Query('totalCombo1')
  async totalCombo1() {
    const ser1 = await await this.serviceRepository.findOne({name: "Dịch vụ cắt tỉa lông"})
    const ser2 = await await this.serviceRepository.findOne({name: "Dịch vụ spa tắm rửa"})
    return (ser1.price +ser2.price)*0.9
  }
  @Query('totalCombo2')
  async totalCombo2() {
    const arr = await await this.serviceRepository.find()
    return (arr[0].price +arr[1].price+ arr[2].price) *0.85
  }
  @Query('service')
  async service(@Args('name') name: string): Promise<Service> {
    try {
			const message = 'Not Found: Service'
			const code = '404'
			const additionalProperties = {}

			const service = await this.serviceRepository.findOne({name})

			if (!service) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return service
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('createService')
  async createService(@Args('name') name: string, @Args('price') price: number, @Args('amount') amount: number ): Promise<Service> {
    const message = "Tên dịch vụ đã tồn tại"
    const existedService =  await this.serviceRepository.findOne({name})
    if(existedService){
      throw new Error(message)
    }
    const service = new Service()
    service.name = name
    service.amount = amount
    service.price = price
    return await this.serviceRepository.save(service)
  }
  
  @Mutation('updateService')
  async updateService(@Args('_id') _id: string, @Args('price') price: number, @Args('amount') amount: number): Promise<Boolean> {
    try {
			const message = 'Not Found: Service'
			const code = '404'
			const additionalProperties = {}

			const service = await this.serviceRepository.findOne({_id})

			if (!service) {
				throw new ApolloError(message, code, additionalProperties)
			}
      service.amount = amount
      service.price = price
      return await this.serviceRepository.save(service) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('updateAmountService')
  async updateAmountService(@Args('_id') _id: string, @Args('amount') amount: number): Promise<Boolean> {
    try {
			const message = 'Not Found: Service'
			const code = '404'
			const additionalProperties = {}

			const service = await this.serviceRepository.findOne({_id})
			if (!service) {
				throw new ApolloError(message, code, additionalProperties)
			}
      service.amount = amount
      return await this.serviceRepository.save(service) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
}