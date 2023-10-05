import { Module } from '@nestjs/common';
import { UsersService } from '../users';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt.strategy';
import { LocalAuthStrategy } from '../local-auth.strategy';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtGuard } from '../jwt.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    AuthResolver,
    LocalAuthStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useValue: new JwtGuard(new Reflector()),
    },
  ],
})
export class AuthModule {}
