import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthPayload } from '@paseybuk/types/schema-graphql';
import { User } from '@prisma/client';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthPayload)
  async login(@Context('user') user: User) {
    return this.authService.signTokenAsync(user);
  }
}
