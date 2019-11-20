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
    return await this.userRepository.find({isActive: true});
  }

  async findById(_id: string): Promise<User> {
    return await this.userRepository.findOne({_id, isActive: true});
  }

  async create(input: UserInput): Promise<User> {
    const { username, password, firstName, lastName, email, address, phone } = input
    const message = 'Email đã được đăng ký'
    const existedUser = await this.userRepository.findOne({ email })
    if (existedUser) {
			throw new Error(message)
    }
    const existedUserName = await this.userRepository.findOne({ username })
    if (existedUserName) {
			throw new Error('Tên đăng nhập đã tồn tại')
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
    const existedUser = await this.userRepository.findOne({ _id, isActive: true })
    if (!existedUser) {
			throw new Error(message)
		}
    existedUser.isLock = !existedUser.isLock
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async deleteAll(): Promise<boolean> {
    return (await this.userRepository.deleteMany({})) ? true : false;
  }
  async updateUser(_id: string, input: UpdateUserInput): Promise<boolean> {
    const { address, phone, gender, birthDay } = input
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id, isActive: true })
    if (!existedUser) {
			throw new Error(message)
		}
    existedUser.address = address
    existedUser.phone = phone
    existedUser.gender = gender
    existedUser.birthDay = birthDay
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async updatePass(_id: string, oldPass: string, newPass: string): Promise<boolean> {
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id, isActive: true })
    if (!existedUser || !(await existedUser.matchesPassword(oldPass))) {
			throw new Error(message)
		}
    existedUser.password = newPass
    return (await this.userRepository.save(existedUser)) ? true : false
  }
  async login(input: LoginUserInput): Promise<LoginResponse> {
    const { username, password } = input;
    const message = 'Tên tài khoản hoặc mật khẩu sai';
    const existedUser = await this.userRepository.findOne({ username, isActive: true});
    if(existedUser && existedUser.isLock === true){
      throw new Error('Tài khoản đã bị khóa')
    }
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
  async setUrlImg(_id: string, urlImg: string): Promise<boolean> {
    const message = 'Not Found: User'
    const existedUser = await this.userRepository.findOne({ _id })
    if (!existedUser) {
			throw new Error(message)
    }
    existedUser.urlImg = "http://localhost:3000/files/"+urlImg
    return (await this.userRepository.save(existedUser)) ? true : false
  }

}