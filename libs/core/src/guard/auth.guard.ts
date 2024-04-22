import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') return false;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;
    const jwt = (authHeader as string).split(' ')[1];

    return this.authService.send({ cmd: 'verify-jwt' }, { jwt }).pipe(
      switchMap(({ exp }) => {
        if (!exp) return of(false);

        const TOKEN_EXP_MS = exp * 1000;

        const isJwtValid = Date.now() < TOKEN_EXP_MS;

        return of(isJwtValid);
      }),
      catchError(() => {
        throw new Error('');
      })
    );
  }
}
