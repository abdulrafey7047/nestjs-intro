import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs";

// Interceptors can be method-scoped, controller-scoped or global-scoped
@Injectable()
export class UserLoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        console.log('UserLoggingInterceptor - Before')
        const now = Date.now()
        return next.handle().pipe(
            tap( () => console.log(`UserLoggingInterceptor - After, execution time: ${Date.now() - now}ms`) )
        )
    }
}