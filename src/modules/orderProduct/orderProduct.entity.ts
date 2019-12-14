import { Entity, Column, ObjectIdColumn, BeforeInsert, Index } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
  IsBoolean,
  IsInt,
} from 'class-validator'
import { Product } from '../product/product.entity';
export class OrderProductInput {
  @IsString()
	@IsNotEmpty()
	idUser: string

  @IsString()
	@IsNotEmpty()
	idProduct: string
	
  @IsInt()
	@IsNotEmpty()
  amount: number

	@IsString()
	@IsNotEmpty()
	date: string
}
@Entity()
export class OrderProduct {
  @ObjectIdColumn()
  _id: string
  
  @Column()
	@IsString()
	@IsNotEmpty()
	idBillPro: string

  @Column()
	@IsString()
	@IsNotEmpty()
  idUser: string
  
  @Column()
	@IsNotEmpty()
  product:Product

  @Column()
	@IsInt()
	@IsNotEmpty()
  amount: number

  @Column()
	@IsInt()
	@IsNotEmpty()
  total: number

  @Column()
	@IsString()
	@IsNotEmpty()
  date: string
  
  @Column()
	@IsBoolean()
	@IsNotEmpty()
  inBill: boolean
  
  @Column()
	@IsBoolean()
	@IsNotEmpty()
  isActive: boolean
  @BeforeInsert()

  async b4register() {
    this._id = uuid.v1()
    this.isActive = true
    this.inBill = false
	}
}