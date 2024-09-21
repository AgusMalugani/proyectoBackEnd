import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const route = request.route.path;
        const method = request.method;

        if(route.includes("users") && method === "POST" ){
            return true;
        }

        if(route.includes("products") && method === "GET"){
            return true;
        }

        return validateRequest(request);
    }
}

function validateRequest(request:Request){
    const auth = request.headers.authorization;
    return auth === "user@mail.com:Pass123"
    }
    

