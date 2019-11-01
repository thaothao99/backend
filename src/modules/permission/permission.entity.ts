import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
} from 'class-validator'
export class PermissionInput {
  code: string;
  name: string;
}

@Entity()
export class Permission {
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