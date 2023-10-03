import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
}
