import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import type { Request } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const startedAt = performance.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Math.round(performance.now() - startedAt);
        this.logger.log(`${request.method} ${request.url} ${duration}ms`);
      }),
    );
  }
}
