import { Module } from '@nestjs/common';
import { UsersService } from '../users';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UsersService, AuthResolver],
})
export class AuthModule {}
