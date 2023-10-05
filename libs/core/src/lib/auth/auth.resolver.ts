import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthPayload } from '@paseybuk/types/schema-graphql';
import { Public } from '../constants';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthPayload)
  async login(@Context() context: any) {
    return this.authService.signTokenAsync(context.req.user);
  }
}
