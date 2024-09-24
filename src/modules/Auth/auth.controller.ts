import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import {  Response } from "express";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/loginUserDTO";


@Controller("/auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}



@Post("signin")
async login(@Body() credentials:LoginUserDTO, @Res() res:Response ){
  
const usuario = await this.authService.getAuth(credentials);
if(usuario){
res.status(200).json(usuario);
} else{
throw new HttpException({status:400, error:"Credenciales incorrectas"},HttpStatus.BAD_REQUEST)
}
}


}
