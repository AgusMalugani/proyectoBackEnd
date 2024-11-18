import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO{
    @IsString()
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres.' })
    @MaxLength(80, { message: 'El nombre de usuario no puede tener más de 80 caracteres.' })
    @IsNotEmpty()
    @ApiProperty()
    name:string;
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    
    //@IsStrongPassword()
    @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty()
    password:string;
      
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    repeatPassword: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: ' address debe tener al menos 3 caracteres.' })
    @MaxLength(80, { message: 'address no puede tener más de 80 caracteres.' })
    @ApiProperty()
    address:string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    phone:string;

    @IsString()
    @IsOptional()
    @MinLength(5, { message: 'country  debe tener al menos 5 caracteres.' })
    @MaxLength(20, { message: 'country  no puede tener más de 20 caracteres.' })
    @ApiProperty()
   country?:string;

    @IsString()
    @IsOptional()
    @MinLength(5, { message: 'city  debe tener al menos 5 caracteres.' })
    @MaxLength(20, { message:  " city no puede tener más de 20 caracteres." })
    @ApiProperty()
    city?:string

    constructor(partial : Partial<CreateUserDTO>){Object.assign(this,partial)}

    }
