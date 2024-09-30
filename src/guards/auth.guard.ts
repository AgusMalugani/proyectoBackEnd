import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { log } from "console";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request.headers["authorization"]){
         throw new UnauthorizedException()
        }
        
        const [type,token] = request.headers["authorization"].split(" ")
      //const token = request.headers["authorization"]
     if(!token){
        throw new UnauthorizedException();
     }
     try {
      
         const payload =  this.jwtService.verify(token,{secret:"claveSecreta"});
         request.user=payload;
        return true

     } catch (error) {
        throw new UnauthorizedException("Hubo un error en el token, con la clave");
     }
     

    }
}



