import { Entity, Column, ObjectID, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';

export class UserInput {
  username: string;
  password: string;
}
export class LoginResponse {
  token: string;
}
export abstract class IMutation {
  abstract createUser(input: UserInput): User | Promise<User>;

  abstract updateUser(_id: string, input: UserInput): User | Promise<User>;

  abstract deleteUser(_id: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
  abstract users(): User[] | Promise<User[]>;

  abstract user(): User | Promise<User>;
}

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  username: string;
  @Column()
  password: string;
  @BeforeInsert()

  async b4register() {
    this._id = await uuid.v4();
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async b4update() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}