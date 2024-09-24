import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO{
    @IsString()
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres.' })
    @MaxLength(80, { message: 'El nombre de usuario no puede tener más de 80 caracteres.' })
    @IsNotEmpty()
    name:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string;

    
    //@IsStrongPassword()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: ' address debe tener al menos 3 caracteres.' })
    @MaxLength(80, { message: 'address no puede tener más de 80 caracteres.' })
    address:string;

    @IsNumber()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsOptional()
    @MinLength(5, { message: 'country  debe tener al menos 3 caracteres.' })
    @MaxLength(20, { message: 'country  no puede tener más de 80 caracteres.' })
   country:string;

    @IsString()
    @IsOptional()
    @MinLength(5, { message: 'city  debe tener al menos 3 caracteres.' })
    @MaxLength(20, { message:  " city no puede tener más de 80 caracteres." })
    city:string
}