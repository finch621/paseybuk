import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '@paseybuk/types/schema-graphql';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPipe implements PipeTransform<CreateUserDto> {
  async transform(value: CreateUserDto) {
    return { ...value, password: await bcrypt.hash(value.password, 8) };
  }
}
