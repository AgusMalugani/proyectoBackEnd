import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import {  Response } from "express";
import { loginCredentialsDTO } from "src/dto/userDto/loginCredentialsDTO";
import { AuthService } from "./auth.service";


@Controller("/auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}

@Get()
getAllAuth():string{
return this.authService.getAllAuth();
}

@Post("signin")
async login(@Body() credentials:loginCredentialsDTO, @Res() res:Response ){
  
const usuario = await this.authService.getAuth(credentials);
if(usuario){
res.status(200).json(usuario);
} else{
    res.status(400).json({message:"Email o contraseña incorrecta"});
}
}


}
