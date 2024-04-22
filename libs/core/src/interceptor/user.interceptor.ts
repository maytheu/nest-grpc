import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, switchMap } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return next.handle();

    const jwt = (authHeader as string).split(' ')[1];
    return this.authService.send({ cmd: 'decode-jwt' }, { jwt }).pipe(
      switchMap(({ id }) => {
        request.user = id;
        return next.handle();
      }),
      catchError(() => next.handle())
    );
  }
}
