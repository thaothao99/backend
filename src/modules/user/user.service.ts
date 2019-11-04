import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserInput, LoginResponse, LoginUserInput, UpdateUserInput } from './user.entity';
import { MongoRepository, getMongoRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(_id: string): Promise<User> {
    return await this.userRepository.findOne({_id});
  }

  async create(input: UserInput): Promise<User> {
    const { username, password, firstName, lastName, email, address, phone } = input
    const message = 'Email has already been taken.'
    const existedUser = await this.userRepository.findOne({ email })
    if (existedUser) {
			throw new Error(message)
		}
    const user = new User()
		user.username = username
    user.password = password
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.address = address
    user.phone = phone
    user.role = await getMongoRepository(Role).findOne({code: 'USER'})
		return await this.userRepository.save(user)
  }

  async deleteOne(_id: string): Promise<boolean> {
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id })
    if (!existedUser) {
			throw new Error(message)
		}
    existedUser.isActive = false
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async lockUser(_id: string): Promise<boolean> {
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id })
    if (!existedUser) {
			throw new Error(message)
		}
    existedUser.isLock = true
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async deleteAll(): Promise<boolean> {
    return (await this.userRepository.deleteMany({})) ? true : false;
  }
  async updateUser(_id: string, input: UpdateUserInput): Promise<boolean> {
    const { address, phone } = input
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id })
    if (!existedUser) {
			throw new Error(message)
		}
    existedUser.address = address
    existedUser.phone = phone
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async updatePass(_id: string, oldPass: string, newPass: string): Promise<boolean> {
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id })
    if (!existedUser || !(await existedUser.matchesPassword(oldPass))) {
			throw new Error(message)
		}
    existedUser.password = newPass
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async login(input: LoginUserInput): Promise<LoginResponse> {
    const { username, password } = input;
    const message = 'Incorrect email or password. Please try again.';
    const existedUser = await this.userRepository.findOne({ username});
    if (!existedUser || !(await existedUser.matchesPassword(password))) {
      throw new AuthenticationError(message);
    }
    const token = jwt.sign(
      { id: existedUser._id, username: existedUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    return { token };
  }
  async setRole(_id: string, code: string): Promise<boolean> {
    const existedrole = await getMongoRepository(Role).findOne({ code })
    if (!existedrole) {
      throw new Error('Not found: Role')
    }
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id })
    if (!existedUser) {
			throw new Error(message)
    }
    existedUser.role = existedrole
    return (await this.userRepository.save(existedUser)) ? true : false
  }
}