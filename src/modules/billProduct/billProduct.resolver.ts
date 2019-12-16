import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository, getMongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {BillProduct, BillProductInput} from './billProduct.entity'
import {Product} from '../product/product.entity'
import {OrderProduct} from '../orderProduct/orderProduct.entity'
import {OrderProductModule} from '../orderProduct/orderProduct.module'
import uuid = require('uuid')

@Resolver('BillProduct')
export class BillProductResolver {
  constructor(
    @InjectRepository(BillProduct)
    private readonly billProRes: MongoRepository<BillProduct>
  ){}
  @Query('billProducts')
  async billProducts(@Args('status') status: string, @Args('idUser') idUser: string,  @Args('date') date: string ){
    let conditional ={isActive: true}
    if(status){
      conditional['status']= status
    }
    if(idUser){
      conditional['idUser']= idUser
    }
    if(date){
      conditional['date']= date
    }
    return await this.billProRes.find({where: conditional})
  }
  @Query('billProductsNotIsActive')
  async billProductsNotIsActive(){
    return await this.billProRes.find({isActive: false})
  }
  @Query('billProduct')
  async billProduct(@Args('_id') _id: string): Promise<BillProduct> {
    try {
			const message = 'Not Found: billProduct'
			const code = '404'
			const additionalProperties = {}

			const a = await this.billProRes.findOne({_id})

			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return a
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Query('billProductByUser')
  async billProductByUser(@Args('idUser') idUser: string): Promise<string> {
      const a = await this.billProRes.findOne({idUser, isActive: false})
      if(!a)  return ' '
      return a._id
  }
  @Mutation('updateBillProduct')
  async updateBillProduct(@Args('_id') _id: string, @Args('input') input: BillProductInput): Promise<BillProduct> {
    try {
			const message = 'Not Found: billProduct'
			const code = '404'
			const additionalProperties = {}

			const a = await this.billProRes.findOne({_id})

			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
			}
      const {idUser, total, address, note, date, phone} = input
      a.idUser= idUser
      a.total = total 
      a.address = address
      a.note = note
      a.date = date
      a.phone = phone

      a.isActive = true
      return (await this.billProRes.save(a))
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}

  }
  @Mutation('createBillProductDefault')
  async createBillProductDefault(@Args('idUser') idUser: string, @Args('date') date: string ): Promise<BillProduct> {
    const a = await this.billProRes.findOne({ idUser, isActive: false })
    if(a) return a
    const newBill = new BillProduct()
    newBill.idUser= idUser
    newBill.date = date
    newBill.isActive = false
    return (await this.billProRes.save(newBill))
  }

  @Mutation('updateStatusBillPro')
  async updateStatusBillPro(@Args('_id') _id: string,  @Args('status') status: string, @Args('date') date: string): Promise<Boolean> {
    try {
			const message = 'Not Found: BillProduct'
			const code = '404'
			const additionalProperties = {}

			const a = await this.billProRes.findOne({_id})
			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
      }
      
      a.status = status
      a.date = date
      return await this.billProRes.save(a) ? true : false      

		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
 
}