import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginUserDTO{
    @IsEmail()
    @IsNotEmpty()
    email : string;

   // @IsStrongPassword()
   @IsNotEmpty() 
   password:string
}