import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserInput, LoginResponse } from './user.entity';
import { MongoRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

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
    return await this.userRepository.findOne(_id);
  }

  async create(input: UserInput): Promise<User> {
    return await this.userRepository.save({ ...input });
  }

  // async update(_id: string, input: UserInput): Promise<User> {
  //   return await this.userRepository.update({ _id });
  // }
  async deleteOne(_id: string): Promise<boolean> {
    return (await this.userRepository.deleteOne({_id})) ? true : false;
  }
  async deleteAll(): Promise<boolean> {
    return (await this.userRepository.deleteMany({})) ? true : false;
  }
  async login(input: UserInput): Promise<LoginResponse> {
    //console.log('TCL: UserService -> input', input);
    //  return { token: '123123123' };
    const { username, password } = input;
    const message = 'Incorrect email or password. Please try again.';
    const user = await this.userRepository.findOne({ username, password});

    if (!user ) {
      throw new AuthenticationError(message);
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    return { token };
  }
  
}