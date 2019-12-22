import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository, getMongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {BillService, BillServiceInput} from './billService.entity'
import {Service} from '../service/service.entity'

@Resolver('BillService')
export class BillServiceResolver {
  constructor(
    @InjectRepository(BillService)
    private readonly BillSerRes: MongoRepository<BillService>
  ){}
  @Query('billServices')
  async billServices(@Args('status') status: string, @Args('idUser') idUser: string,  @Args('date') date: string ){
    let conditional = {}
    if(status){
      conditional['status']= status
    }
    if(idUser){
      conditional['idUser']= idUser
    }
    if(date){
      conditional['date']= date
    }
    return await this.BillSerRes.find({where: conditional})
  }

  @Query('billService')
  async billService(@Args('_id') _id: string): Promise<BillService> {
    try {
			const message = 'Not Found: billService'
			const code = '404'
			const additionalProperties = {}

			const a = await this.BillSerRes.findOne({_id})

			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return a
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  
  @Mutation('createbillService')
  async createbillService(@Args('input') input: BillServiceInput): Promise<BillService> {
    try {
      const a=new BillService()
      const {idUser, idPet, nameService, date, total} = input
      if(nameService == "Gói COMBO tiết kiệm") {
        await getMongoRepository(Service).updateOne({"name": "Dịch vụ cắt tỉa lông"},  {$inc: { "amount": -1}})
        await getMongoRepository(Service).updateOne({"name": "Dịch vụ spa tắm rửa"},  {$inc: { "amount": -1}})
      }
      else {
        if(nameService == "COMBO trọn gói 3 trong 1 siêu tiết kiệm") {
          await getMongoRepository(Service).updateOne({"name": "Dịch vụ cắt tỉa lông"},  {$inc: { "amount": -1}})
          await getMongoRepository(Service).updateOne({"name": "Dịch vụ spa tắm rửa"},  {$inc: { "amount": -1}})
          await getMongoRepository(Service).updateOne({"name": "Dịch vụ khách sạn"},  {$inc: { "amount": -1}})
        }
        else {
          await getMongoRepository(Service).updateOne({"name": nameService},  {$inc: { "amount": -1}})
        }
      }
    
      a.idUser = idUser
      a.idPet = idPet
      a.date = date
      a.nameService = nameService
      a.total=total
      a.status = "Đặt chỗ thành công"
      return (await this.BillSerRes.save(a)) 
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}

  }
  @Mutation('updateStatusBillSer')
  async updateStatusBillSer(@Args('_id') _id: string,  @Args('status') status: string, @Args('date') date: string): Promise<Boolean> {
    try {
			const message = 'Not Found: BillService'
			const code = '404'
			const additionalProperties = {}

			const a = await this.BillSerRes.findOne({_id})
			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
      }
      const date1 = new Date(date) 
      const date2 =new Date(a.date)
      const days = (date1.getTime() - date2.getTime())  / (1000 * 3600 * 24)
      if( days>= 7 && status === "Đã hủy"){
        throw new Error('Quá thời gian hủy đơn hàng')
      }
      a.status = status
      a.date = date
      return await this.BillSerRes.save(a) ? true : false      

		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
 
}