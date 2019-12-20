import { Entity, Column, ObjectIdColumn, BeforeInsert, Index } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
  IsBoolean,
  IsInt,
} from 'class-validator'
@Entity()
export class Service {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	name: string


  @Column()
	@IsInt()
	@IsNotEmpty()
  price: number

  @Column()
	@IsInt()
	@IsNotEmpty()
  amount: number

  @BeforeInsert()
  async b4register() {
    this._id = uuid.v1()
	}
}