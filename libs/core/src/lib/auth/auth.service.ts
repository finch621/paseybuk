import { Injectable } from '@nestjs/common';
import { AuthPayload } from '@paseybuk/types/schema-graphql';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const existingUser = await this.usersService.getByEmail(email);

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      return existingUser;
    }

    return null;
  }

  async login(email: string, password: string): Promise<AuthPayload | null> {
    const existingUser = await this.validateUser(email, password);

    if (existingUser) {
      return this.signTokenAsync(existingUser);
    }

    return null;
  }

  async signTokenAsync(user: User) {
    return {
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
      user: { ...user, password: null },
    };
  }
}
