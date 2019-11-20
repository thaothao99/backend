
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class LoginUserInput {
    username: string;
    password: string;
}

export class PermissionInput {
    code: string;
    name: string;
}

export class PetInput {
    name: string;
    age: string;
    gender: string;
    species: string;
    breed: string;
    owner: string;
    health: string;
}

export class RoleInput {
    code: string;
    name: string;
}

export class RolePermissionInput {
    idRole: string;
    idPermission: string;
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

export class LoginResponse {
    token: string;
}

export abstract class IMutation {
    abstract createPermission(input: PermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(_id: string, input: PermissionInput): boolean | Promise<boolean>;

    abstract deletePermission(_id: string): boolean | Promise<boolean>;

    abstract createPet(input: PetInput): Pet | Promise<Pet>;

    abstract deletePet(_id: string): boolean | Promise<boolean>;

    abstract updatePet(_id: string, input: PetInput): boolean | Promise<boolean>;

    abstract createRole(input: RoleInput): Role | Promise<Role>;

    abstract updateRole(_id: string, input: RoleInput): boolean | Promise<boolean>;

    abstract deleteRole(_id: string): boolean | Promise<boolean>;

    abstract createRolePermission(input: RolePermissionInput): RolePermission | Promise<RolePermission>;

    abstract deleteRolePermission(_id: string): boolean | Promise<boolean>;

    abstract createUser(input: UserInput): User | Promise<User>;

    abstract updateUser(_id: string, input: UpdateUserInput): boolean | Promise<boolean>;

    abstract deleteUser(_id: string): boolean | Promise<boolean>;

    abstract deleteAll(): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract updatePasword(_id: string, oldPass: string, newPass: string): boolean | Promise<boolean>;

    abstract lockUSer(_id: string): boolean | Promise<boolean>;

    abstract setRole(_id: string, code: string): boolean | Promise<boolean>;

    abstract updateUrlImg(_id: string, urlImg: string): boolean | Promise<boolean>;
}

export class Permission {
    _id: string;
    code: string;
    name: string;
}

export class Pet {
    _id: string;
    name: string;
    age: string;
    gender: string;
    species: string;
    breed: string;
    owner: string;
    health: string;
    isActive: boolean;
}

export abstract class IQuery {
    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract permission(_id: string): Permission | Promise<Permission>;

    abstract pets(): Pet[] | Promise<Pet[]>;

    abstract pet(_id: string): Pet | Promise<Pet>;

    abstract petByOwner(owner: string): Pet[] | Promise<Pet[]>;

    abstract roles(): Role[] | Promise<Role[]>;

    abstract role(_id: string): Role | Promise<Role>;

    abstract rolePermissions(): RolePermission[] | Promise<RolePermission[]>;

    abstract rolePermission(_id: string): RolePermission | Promise<RolePermission>;

    abstract hello(): string | Promise<string>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(_id: string): User | Promise<User>;

    abstract me(): User | Promise<User>;
}

export class Role {
    _id: string;
    code: string;
    name: string;
}

export class RolePermission {
    _id: string;
    idRole: string;
    idPermission: string;
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
