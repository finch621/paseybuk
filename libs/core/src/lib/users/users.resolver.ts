import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '@paseybuk/types/schema-graphql';
import { User } from '@prisma/client';
import { HashPipe } from '../hash.pipe';

import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation()
  async createUser(
    @Args('createUserDto', HashPipe) data: CreateUserDto
  ): Promise<User> {
    return this.usersService.create(data);
  }
}
