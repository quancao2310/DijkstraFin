import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKIP_CHECK_USER_ID_KEY } from './skip-check-user-id.decorator';

@Injectable()
export class CheckUserIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const target = context.getHandler();
    const skipCheck = Reflect.getMetadata(SKIP_CHECK_USER_ID_KEY, target);

    // If check is skipped, return the response without performing checks
    if (skipCheck) {
      return next.handle();
    }

    return next.handle().pipe(
      map(data => {
        const request = context.switchToHttp().getRequest();
        const userIdFromBody = request.body.userId;

        // Check if the returned data is an array (list of objects)
        if (Array.isArray(data)) {
          for (const obj of data) {
            const userIdFromObject = obj.userId.toString();
            if (userIdFromBody !== userIdFromObject) {
              throw new ForbiddenException('You don\'t have permission to make this action!');
            }
          }
        } else { // If it's a single object
          const userIdFromObject = data.userId.toString();
          if (userIdFromBody !== userIdFromObject) {
            throw new ForbiddenException('You don\'t have permission to make this action!');
          }
        }

        return data;
      }),
    );
  }
}
