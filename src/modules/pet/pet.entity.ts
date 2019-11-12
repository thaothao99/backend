import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
  IsBoolean,
} from 'class-validator'
export class PetInput {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
  age: string
  
  @IsString()
	@IsNotEmpty()
  gender: string

	@IsString()
	@IsNotEmpty()
  species: string

	@IsString()
	@IsNotEmpty()
  breed: string

	@IsString()
	@IsNotEmpty()
  owner: string

  @IsString()
	@IsNotEmpty()
  health: string
}
@Entity()
export class Pet {
	@ObjectIdColumn()
	_id: string

  @IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
  age: string
  
  @IsString()
	@IsNotEmpty()
  gender: string

	@IsString()
	@IsNotEmpty()
  species: string

	@IsString()
	@IsNotEmpty()
  breed: string

	@IsString()
	@IsNotEmpty()
  owner: string

  @IsString()
	@IsNotEmpty()
  health: string
	
  @Column()
	@IsBoolean()
	@IsNotEmpty()
  isActive: boolean
  
  @BeforeInsert()
  async b4register() {
    this._id = await uuid.v1()
    this.isActive = true
  }
}