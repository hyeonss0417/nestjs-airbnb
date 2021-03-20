import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new Logger('Request', true);

    logger.log(
      `Begin: ${context.getClass().name} - ${context.getHandler().name} `,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(t => {
        logger.log(
          `End: ${context.getClass().name} - ${
            context.getHandler().name
          } (${Date.now() - now}ms)`,
        );
      }),
    );
  }
}
