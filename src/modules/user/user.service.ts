import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserInput, LoginResponse } from './user.entity';
import { Repository, MongoRepository } from 'typeorm';

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
    console.log('TCL: UserService -> input', input);

    return { token: '123123123' };
  }
}