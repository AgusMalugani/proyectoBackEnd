import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseInterceptors } from "@nestjs/common";
import {  Response } from "express";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/loginUserDTO";
import { SignUpDto } from "./dto/signup.dto";
import { CreateUserDTO } from "../Users/dto/create-user.dto";


@Controller("/auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}



@Post("singup")
async singUp(@Body() user : SignUpDto){
    console.log(user);
return await this.authService.signUpUser(user);
}



@Post("signin")
async login(@Body() credentials:LoginUserDTO, @Res() res:Response ){
  const token =  await this.authService.signInUser(credentials);
  
return res.status(200).json({success: "usuario encontrado" , token : token})


}


}
