
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserDto {
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(createUserDto: CreateUserDto): Nullable<User> | Promise<Nullable<User>>;

    abstract login(email: string, password: string): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
}

export class User {
    id: string;
    email?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    deletedAt?: Nullable<DateTime>;
}

export class AuthPayload {
    token: string;
    user: User;
}

export type DateTime = any;
type Nullable<T> = T | null;
