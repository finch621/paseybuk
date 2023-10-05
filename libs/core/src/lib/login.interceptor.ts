import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.authService.login(data)));
  }
}
