import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as uuid from 'uuid';
import {
	IsString,
	IsNotEmpty,
} from 'class-validator'
export class RolePermissionInput {
  idRole: string;
  idPermission: string;
}

@Entity()
export class RolePermission {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	idRole: string

	@Column()
	@IsString()
	@IsNotEmpty()
  idPermission: string
  
  @BeforeInsert()
  b4insert(){
    this._id = uuid.v1()
  }
}