import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res, UseInterceptors } from "@nestjs/common";
import {  Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../Users/dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { SignInDto } from "./dto/sign-in-dto";

@ApiTags("Auth")
@Controller("/auth")
export class AuthController{
    constructor(private readonly authService:AuthService){}



@Post("signup")
@HttpCode(201)
async singUp(@Body() user : CreateUserDTO){
    
  const newUser = await this.authService.signUpUser(user);

  return {message:"Registro exitoso",data:newUser}
}



@Post("signin")
@HttpCode(200)
async login(@Body() credentials:SignInDto, ){
  const token =  await this.authService.signInUser(credentials);
  
return {success: "usuario encontrado" , token : token}


}


}
