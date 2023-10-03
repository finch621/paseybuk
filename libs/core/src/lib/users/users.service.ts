import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma';

@Injectable()
export class UsersService {
  constructor(readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
