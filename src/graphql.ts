
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class BillProductInput {
    address: string;
    note: string;
    date: string;
    phone: string;
    total: number;
}

export class LoginUserInput {
    username: string;
    password: string;
}

export class OrderProductInput {
    idUser: string;
    idProduct: string;
    amount: number;
    date: string;
    idBillPro: string;
}

export class PetInput {
    name: string;
    age: number;
    gender: string;
    species: string;
    breed: string;
    owner: string;
    health: string;
    urlImg?: string;
}

export class ProductInput {
    name: string;
    description: string;
    price: number;
    amount: number;
    urlImg?: string;
    type: string;
}

export class RoleInput {
    code: string;
    name: string;
}

export class UpdatePetInput {
    age: number;
    health: string;
    urlImg?: string;
}

export class UpdateUserInput {
    phone: string;
    address: string;
    birthDay: string;
    gender: string;
}

export class UserInput {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export class BillProduct {
    _id: string;
    idUser?: string;
    total?: number;
    status?: string;
    address?: string;
    phone?: string;
    note?: string;
    date?: string;
    isActive?: boolean;
}

export class LoginResponse {
    token: string;
}

export abstract class IMutation {
    abstract updateBillProduct(_id: string, input: BillProductInput): boolean | Promise<boolean>;

    abstract createBillProductDefault(idUser: string, date: string): BillProduct | Promise<BillProduct>;

    abstract updateStatusBillPro(_id: string, status: string, date: string): boolean | Promise<boolean>;

    abstract createOrderProduct(input: OrderProductInput): OrderProduct | Promise<OrderProduct>;

    abstract updateAmountOrderProduct(_id: string, amount: number, date: string): boolean | Promise<boolean>;

    abstract deleteOrderProduct(_id: string): boolean | Promise<boolean>;

    abstract createPet(input: PetInput): Pet | Promise<Pet>;

    abstract deletePet(_id: string): boolean | Promise<boolean>;

    abstract updatePet(_id: string, input: UpdatePetInput): boolean | Promise<boolean>;

    abstract createProduct(input: ProductInput): Product | Promise<Product>;

    abstract updateAmount(_id: string, amount: number): boolean | Promise<boolean>;

    abstract updateProduct(_id?: string, input?: ProductInput): boolean | Promise<boolean>;

    abstract deleteProduct(_id?: string): boolean | Promise<boolean>;

    abstract createRole(input: RoleInput): Role | Promise<Role>;

    abstract updateRole(_id: string, input: RoleInput): boolean | Promise<boolean>;

    abstract deleteRole(_id: string): boolean | Promise<boolean>;

    abstract createService(name: string, price: string, amount: string): boolean | Promise<boolean>;

    abstract updateService(name: string, price: string, amount: string): boolean | Promise<boolean>;

    abstract createUser(input: UserInput): User | Promise<User>;

    abstract updateUser(_id: string, input: UpdateUserInput): boolean | Promise<boolean>;

    abstract deleteUser(_id: string): boolean | Promise<boolean>;

    abstract deleteAll(): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract updatePasword(_id: string, oldPass: string, newPass: string): boolean | Promise<boolean>;

    abstract lockUSer(_id: string): boolean | Promise<boolean>;

    abstract lockUSerAcc(_id: string): boolean | Promise<boolean>;

    abstract setRole(_id: string, code: string): boolean | Promise<boolean>;

    abstract updateUrlImg(_id: string, urlImg: string): boolean | Promise<boolean>;
}

export class OrderProduct {
    _id: string;
    idBillPro: string;
    idUser: string;
    product: Product;
    amount: number;
    total: number;
    date: string;
    isActive: boolean;
}

export class Pet {
    _id: string;
    name: string;
    age: number;
    gender: string;
    species: string;
    breed: string;
    owner: string;
    health: string;
    urlImg?: string;
    isActive: boolean;
}

export class Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
    type: string;
    urlImg: string;
    isActive: boolean;
}

export abstract class IQuery {
    abstract billProducts(status?: string, idUser?: string, date?: string): BillProduct[] | Promise<BillProduct[]>;

    abstract billProduct(_id?: string): BillProduct | Promise<BillProduct>;

    abstract billProductsNotIsActive(): BillProduct[] | Promise<BillProduct[]>;

    abstract billProductByUser(idUser: string): string | Promise<string>;

    abstract orderProducts(idBillPro?: string): OrderProduct[] | Promise<OrderProduct[]>;

    abstract orderProduct(_id: string): OrderProduct | Promise<OrderProduct>;

    abstract pets(species?: string, inputSearch?: string): Pet[] | Promise<Pet[]>;

    abstract pet(_id: string): Pet | Promise<Pet>;

    abstract petByOwner(owner: string, species?: string, inputSearch?: string): Pet[] | Promise<Pet[]>;

    abstract products(type?: string, inputSearch?: string): Product[] | Promise<Product[]>;

    abstract product(_id: string): Product | Promise<Product>;

    abstract productByType(type: string): Product[] | Promise<Product[]>;

    abstract roles(): Role[] | Promise<Role[]>;

    abstract role(_id: string): Role | Promise<Role>;

    abstract Service(_id: string): Service | Promise<Service>;

    abstract Services(): Service[] | Promise<Service[]>;

    abstract hello(): string | Promise<string>;

    abstract users(): User[] | Promise<User[]>;

    abstract customers(inputSearch?: string): User[] | Promise<User[]>;

    abstract employees(inputSearch?: string): User[] | Promise<User[]>;

    abstract user(_id: string): User | Promise<User>;

    abstract me(): User | Promise<User>;
}

export class Role {
    _id: string;
    code: string;
    name: string;
}

export class Service {
    _id: string;
    name: string;
    price: number;
    amount: number;
}

export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    isLock: boolean;
    role: Role;
    urlImg?: string;
    birthDay?: string;
    gender?: string;
}
