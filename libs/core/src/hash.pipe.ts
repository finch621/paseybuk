import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPipe implements PipeTransform {
  async transform(value: User) {
    const hashPass = await bcrypt.hash(value.password, 8);
    return { ...value, password: hashPass };
  }
}
