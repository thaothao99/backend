import { Entity, Column, ObjectIdColumn, BeforeInsert, Index } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';
import {
	IsString,
	IsNotEmpty,
  IsEmail,
  IsBoolean,
} from 'class-validator'
import { Role } from '../role/role.entity';
export class UserInput {
	@IsString()
	@IsNotEmpty()
	username: string

	@IsString()
	@IsNotEmpty()
  password: string
  
  @IsString()
	@IsNotEmpty()
  firstName: string

	@IsString()
	@IsNotEmpty()
  lastName: string

	@IsEmail(undefined, { message: 'Invalid email message' })
	@IsNotEmpty({ message: 'Your email can not be blank.' })
  email: string

	@IsString()
	@IsNotEmpty()
  phone: string

	@IsString()
	@IsNotEmpty()
  address: string

}
export class LoginResponse {
  token: string;
}
export class UpdateUserInput {
	@IsString()
	@IsNotEmpty()
  phone: string

	@IsString()
	@IsNotEmpty()
	address: string

	@IsString()
	@IsNotEmpty()
	birthDay: string
	
	@IsString()
	@IsNotEmpty()
  gender: string
}
export class LoginUserInput {
	@IsString()
	@IsNotEmpty()
	username: string
	
	@IsString()
	@IsNotEmpty()
	password: string
}

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
  firstName: string

  @Column()
	@IsString()
	@IsNotEmpty()
  lastName: string

  @Column()
	@IsString()
	@IsNotEmpty()
	@Index({ unique: true })
	email: string

  @Column()
	@IsString()
	@IsNotEmpty()
  phone: string

  @Column()
	@IsString()
	@IsNotEmpty()
  address: string
  
  @Column()
	@IsBoolean()
	@IsNotEmpty()
	isActive: boolean
	
	@Column()
	@IsString()
	@IsNotEmpty()
  urlImg: string

	@Column()
	@IsString()
	@IsNotEmpty()
	birthDay: string
	
	@Column()
	@IsString()
	@IsNotEmpty()
	gender: string

  @Column()
	@IsBoolean()
	@IsNotEmpty()
  isLock: boolean
  
	@Column()
	@IsNotEmpty()
  role: Role
	
  @BeforeInsert()
  async b4register() {
		this.isLock = false
    this._id = uuid.v1()
    this.password = await this.hashPass(this.password)
		this.isActive = true
	}
	async hashPass(password) {
		return await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	}
  async matchesPassword(password) {
		return await bcrypt.compareSync(password, this.password)
	}
}