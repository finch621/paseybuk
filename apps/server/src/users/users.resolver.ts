import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '@paseybuk/types/schema-graphql';
import { User } from '@prisma/client';
import { UsePipes } from '@nestjs/common';
import { HashPipe } from '@paseybuk/core';

import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(HashPipe)
  @Mutation()
  async createUser(@Args('createUserDto') data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }
}
