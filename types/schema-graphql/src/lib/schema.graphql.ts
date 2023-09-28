
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;
}

export class User {
    id: number;
    email: string;
}

type Nullable<T> = T | null;
