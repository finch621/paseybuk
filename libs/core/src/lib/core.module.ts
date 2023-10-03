import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma';
import { UsersModule } from './users';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [PrismaModule, AuthModule, UsersModule],
})
export class CoreModule {}
