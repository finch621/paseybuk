import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { email, password } = ctx.getArgs();

    const existingUser = await this.authService.validateUser(email, password);

    if (!existingUser) {
      throw new UnauthorizedException();
    }

    ctx.getContext().user = existingUser;

    return true;
  }
}
