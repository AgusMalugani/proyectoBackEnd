import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from "class-validator";

export class SignInDto{

    /** Debe contener como maximo 50 caracteres
     * @example ejemplo@ejemplo.com
     */
    @IsEmail()
    @MaxLength(50)
    @IsNotEmpty()
    @ApiProperty({
      description:"Debe contener como maximo 50 caracteres",
      example:"ejemplo@ejemplo.com"
     })
    email : string;

    /** Debe contener una mayuscula, un numero y caracter especial
     * @example Ejemplo91.
     */
   // @IsStrongPassword()
   @IsNotEmpty() 
   @MaxLength(20)
   @ApiProperty({
    description:"Debe contener una mayuscula, un numero y caracter especial",
    example:"Ejemplo91."
   })
   password:string


   constructor(partial : Partial<SignInDto>){Object.assign(this,partial)}

}