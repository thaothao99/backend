import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {Product, ProductInput} from './product.entity'


@Resolver('Product')
export class ProductResolver {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: MongoRepository<Product>
  ){}
  @Query('products')
  async products(@Args('type') type: string, @Args('inputSearch') inputSearch: string ){

    const conditional = { isActive: true }
    if (type) {
      conditional['type']=type
    }

    if (inputSearch) {
      conditional['name']= { $regex: new RegExp(inputSearch,'gi') }
    }

    return await this.productRepository.find({
        where: conditional
      })
    
  }
  @Query('product')
  async product(@Args('_id') _id: string): Promise<Product> {
    try {
			const message = 'Not Found: Product'
			const code = '404'
			const additionalProperties = {}

			const product = await this.productRepository.findOne({_id, isActive: true})

			if (!product) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return product
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Query('productByType')
  async productByType(@Args('type') type: string) {
    return this.productRepository.find({type, isActive: true})
  }
  @Mutation('createProduct')
  async createProduct(@Args('input') input: ProductInput): Promise<Product> {
    const {name, description, price, amount, urlImg, type} = input
    const message = "Tên sản phẩm đã tồn tại"
    const existedProduct =  await this.productRepository.findOne({name, isActive: true})
    if(existedProduct){
      throw new Error(message)
    }
    const product = new Product()
    product.name = name
    product.description = description
    product.amount = amount
    product.price = price
    product.type = type
    product.urlImg =  "http://40.117.97.121/files/"+urlImg 
    return await this.productRepository.save(product)
  }
  @Mutation('deleteProduct')
  async deleteProduct(@Args('_id') _id: string): Promise<Boolean> {
    try {
			const message = 'Not Found: Product'
			const code = '404'
			const additionalProperties = {}

			const product = await this.productRepository.findOne({_id, isActive: true})

			if (!product) {
				throw new ApolloError(message, code, additionalProperties)
			}
      product.isActive = false
      return (await this.productRepository.save(product)) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('updateProduct')
  async updateProduct(@Args('_id') _id: string, @Args('input') input: ProductInput): Promise<Boolean> {
    try {
			const message = 'Not Found: Product'
			const code = '404'
			const additionalProperties = {}

			const product = await this.productRepository.findOne({_id})

			if (!product) {
				throw new ApolloError(message, code, additionalProperties)
			}
      const {name, description, price, amount, urlImg, type} = input
      product.name = name
      product.description = description
      product.amount = amount
      product.price = price
      product.type = type
      product.urlImg = urlImg ?  "http://40.117.97.121/files/"+urlImg : product.urlImg
      return await this.productRepository.save(product) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('updateAmount')
  async updateAmount(@Args('_id') _id: string, @Args('amount') amount: number): Promise<Boolean> {
    try {
			const message = 'Not Found: Product'
			const code = '404'
			const additionalProperties = {}

			const product = await this.productRepository.findOne({_id})
      console.log(amount)
			if (!product) {
				throw new ApolloError(message, code, additionalProperties)
			}
      product.amount = amount
      return await this.productRepository.save(product) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
}