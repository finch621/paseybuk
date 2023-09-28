
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract user(): User | Promise<User>;
}

export class User {
    id: string;
    email: string;
}

type Nullable<T> = T | null;
