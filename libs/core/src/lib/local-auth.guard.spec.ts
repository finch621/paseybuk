import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth';
import { LocalAuthGuard } from './local-auth.guard';
import { PrismaService } from './prisma';
import { UsersService } from './users';

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    expect(
      new LocalAuthGuard(
        new AuthService(new UsersService(new PrismaService()), new JwtService())
      )
    ).toBeDefined();
  });
});
