import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';
import {
	IsString,
	IsNotEmpty,
} from 'class-validator'
export class UserInput {
  username: string;
  password: string;
}
export class LoginResponse {
  token: string;
}
// export abstract class IMutation {
//   abstract createUser(input: UserInput): User | Promise<User>;

//   abstract updateUser(_id: string, input: UserInput): User | Promise<Boolean>;

//   abstract deleteUser(_id: string): boolean | Promise<boolean>;
// }

// export abstract class IQuery {
//   abstract users(): User[] | Promise<User[]>;

//   abstract user(): User | Promise<User>;
// }

@Entity()
export class User {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	username: string

	@Column()
	@IsString()
	@IsNotEmpty()
  password: string
  
	@Column()
	@IsString()
	@IsNotEmpty()
  role: string

  // @BeforeInsert()
	// async b4register() {
	// 	this._id = uuid.v1()
	// 	this.role = 'MEMBER'
  //   this.password = await bcrypt.hash(this.password, 10)
  //   console.log('heloo')
  // } 
  @BeforeInsert()
  async b4register() {
    this._id = await uuid.v1()
    this.password = await bcrypt.hashSync(this.password, 8);
    this.role =''
  }
  @BeforeUpdate()
  async b4update() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async matchesPassword(password) {
		return await bcrypt.compareSync(password, this.password)
	}
}