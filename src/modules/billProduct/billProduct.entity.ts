import { Entity, Column, ObjectIdColumn, BeforeInsert, Index } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator'
export class BillProductInput {
	
	@IsString()
	@IsNotEmpty()
  date: string
  
  @IsString()
	@IsNotEmpty()
  address: string

  @IsString()
	@IsNotEmpty()
  phone: string
  
  @IsString()
	@IsNotEmpty()
  note: string
  
  @IsInt()
	@IsNotEmpty()
  total: number
}
@Entity()
export class BillProduct {
  @ObjectIdColumn()
  _id: string
  

  @Column()
	@IsString()
	@IsNotEmpty()
  idUser: string

  @Column()
	@IsInt()
	@IsNotEmpty()
  total: number

  @Column()
	@IsString()
	@IsNotEmpty()
  status: string

  @Column()
	@IsString()
	@IsNotEmpty()
  address: string
  
  @Column()
	@IsString()
	@IsNotEmpty()
  phone: string

  @Column()
	@IsString()
	@IsNotEmpty()
  date: string

  @Column()
	@IsString()
	@IsNotEmpty()
  note: string

  @Column()
	@IsString()
	@IsNotEmpty()
  isActive: boolean

  @BeforeInsert()
  async b4register() {
    this._id = await uuid.v1()
  }
}