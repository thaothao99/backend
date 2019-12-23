import { Entity, Column, ObjectIdColumn, BeforeInsert, Index } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator'
export class BillServiceInput {
	
	@IsString()
	@IsNotEmpty()
  idUser: string
  
  @IsString()
	@IsNotEmpty()
  idPet: string

  @IsString()
	@IsNotEmpty()
  nameService: string
  
  @IsString()
	@IsNotEmpty()
  date: string
  
  @IsInt()
	@IsNotEmpty()
  total: number
}
@Entity()
export class BillService {
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
  idPet: string

  @Column()
	@IsString()
	@IsNotEmpty()
  nameService: string

  @Column()
	@IsString()
	@IsNotEmpty()
  date: string

  @BeforeInsert()
  async b4register() {
    this._id = await uuid.v1()
  }
}