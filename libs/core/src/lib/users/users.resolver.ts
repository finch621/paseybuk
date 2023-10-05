import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '@paseybuk/types/schema-graphql';
import { User } from '@prisma/client';
import { Public } from '../constants';
import { HashPipe } from '../hash.pipe';
import { JwtGuard } from '../jwt.guard';

import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Mutation()
  async createUser(
    @Args('createUserDto', HashPipe) data: CreateUserDto
  ): Promise<User> {
    return this.usersService.create(data);
  }
}
