import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
} from 'class-validator'
export class RoleInput {
  code: string;
  name: string;
}

@Entity()
export class Role {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	code: string

	@Column()
	@IsString()
	@IsNotEmpty()
	name: string
	
  @BeforeInsert()
  b4insert(){
    this._id = uuid.v1()
  }
}