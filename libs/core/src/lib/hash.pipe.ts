import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '@paseybuk/types/schema-graphql';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPipe implements PipeTransform<User> {
  async transform(value: CreateUserDto) {
    return { ...value, password: await bcrypt.hash(value.password, 8) };
  }
}
