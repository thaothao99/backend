import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository, getMongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {OrderProduct, OrderProductInput} from './orderProduct.entity'
import {Product} from '../product/product.entity'

@Resolver('OrderProduct')
export class OrderProductResolver {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProRes: MongoRepository<OrderProduct>
  ){}
  @Query('orderProducts')
  async oderProducts(@Args('idBillPro') idBillPro: string ){
    const conditional = {isActive: true}
    if(idBillPro){
      conditional['idBillPro']= idBillPro
    }
    return await this.orderProRes.find({where: conditional})
  }
  @Query('orderProductByUser')
  async orderProductByUser(@Args('idUser') idUser: string ){
    const conditional = {isActive: true}
    if(idUser){
      conditional['idUser']= idUser
    }
    return await this.orderProRes.find({where: conditional})
  }
  @Query('orderProduct')
  async orderProduct(@Args('_id') _id: string): Promise<OrderProduct> {
    try {
			const message = 'Not Found: OrderProduct'
			const code = '404'
			const additionalProperties = {}

			const orderProduct = await this.orderProRes.findOne({_id, isActive: true})

			if (!orderProduct) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return orderProduct
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('createOrderProduct')
  async createOrderProduct(@Args('input') input: OrderProductInput): Promise<OrderProduct> {
    const {idUser, idProduct, amount, date} = input
    const product = await getMongoRepository(Product).findOne({_id: idProduct, isActive: true})
    if (!product){
      throw new Error('Not found: Product')
    }
    const existed = await this.orderProRes.findOne({isActive: true, product, idUser, inBill: false})
    if(existed){
      if(product.amount <  existed.amount + amount){
        throw new Error('Số lượng sản phẩm còn lại không đủ')
      }else {
        existed.amount += amount
      existed.total = existed.amount * product.price
      return (await this.orderProRes.save(existed))
      }
      
    }
    const orderProduct = new OrderProduct()
    orderProduct.idUser = idUser
    orderProduct.product = product
    orderProduct.amount = amount
    orderProduct.total = amount * product.price
    orderProduct.date = date
    return await this.orderProRes.save(orderProduct)
  }
  @Mutation('deleteOrderProduct')
  async deleteOrderProduct(@Args('_id') _id: string): Promise<Boolean> {
    try {
			const message = 'Not Found: oderProduct'
			const code = '404'
			const additionalProperties = {}

			const oderProduct = await this.orderProRes.findOne({_id, isActive: true})

			if (!oderProduct) {
				throw new ApolloError(message, code, additionalProperties)
			}
      oderProduct.isActive = false
      return (await this.orderProRes.save(oderProduct)) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('updateAmountOrderProduct')
  async updateAmountOrderProduct(@Args('_id') _id: string,  @Args('amount') amount: number, @Args('date') date: string): Promise<Boolean> {
    try {
			const message = 'Not Found: oderProduct'
			const code = '404'
			const additionalProperties = {}

			const a = await this.orderProRes.findOne({_id})
			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
      }
      if(a.product.amount < amount){
        throw new Error('Số lượng sản phẩm còn lại không đủ')
      }else {
        a.amount = amount
        a.total = a.amount * a.product.price
        a.date = date
        return await this.orderProRes.save(a) ? true : false
      }

		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('addBill')
  async addBill(@Args('_id') _id: string,  @Args('idBillPro') idBillPro: string): Promise<Boolean> {
    try {
			const message = 'Not Found: oderProduct'
			const code = '404'
			const additionalProperties = {}

			const a = await this.orderProRes.findOne({_id})
			if (!a) {
				throw new ApolloError(message, code, additionalProperties)
			}
      a.idBillPro = idBillPro
      return await this.orderProRes.save(a) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
}