import { Entity, Column, ObjectIdColumn, BeforeInsert, Index } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
  IsBoolean,
  IsInt,
} from 'class-validator'
export class ProductInput {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	description: string
	
	@IsString()
	@IsNotEmpty()
  type: string

  @IsInt()
	@IsNotEmpty()
  price: number

  @IsInt()
	@IsNotEmpty()
  amount: number

  @IsString()
	@IsNotEmpty()
  urlImg: string
}

@Entity()
export class Product {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	name: string

	@Column()
	@IsString()
	@IsNotEmpty()
	description: string
  
  @Column()
	@IsString()
	@IsNotEmpty()
  type: string

  @Column()
	@IsInt()
	@IsNotEmpty()
  price: number

  @Column()
	@IsInt()
	@IsNotEmpty()
  amount: number

	@Column()
	@IsString()
	@IsNotEmpty()
  urlImg: string

  @Column()
	@IsBoolean()
	@IsNotEmpty()
  isActive: boolean

  @BeforeInsert()
  async b4register() {
    this._id = uuid.v1()
		this.isActive = true
	}
}