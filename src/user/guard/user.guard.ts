import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


// Guards can be method-scoped, controller-scoped or global-scoped
@Injectable()
export class UserGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        console.log('This is the UserGuard class')
        const request = context.switchToHttp().getRequest()
        // return validateRequest(request);
        return true;
    }
}