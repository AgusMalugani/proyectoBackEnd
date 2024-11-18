import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignInDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email : string;

   // @IsStrongPassword()
   @IsNotEmpty() 
   @ApiProperty()
   password:string


   constructor(partial : Partial<SignInDto>){Object.assign(this,partial)}

}