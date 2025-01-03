import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO{
    /**
     * El nombre debe tener entre 3 y 80 caracteres
     * @example Agustin
     */
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @IsNotEmpty()
    name:string;
    
    
     /** Debe contener como maximo 50 caracteres
     * @example ejemplo@ejemplo.com
     */
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    email:string;

    
    /** Debe contener una mayuscula, un numero y caracter especial
     * @example Ejemplo91.
     */
    @IsStrongPassword()
    @MaxLength(20)
    @IsNotEmpty()
    password:string;
      /** Debe contener una mayuscula, un numero y caracter especial, debe ser igual que password
     * @example Ejemplo91.
     */
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    @IsOptional()
    repeatPassword?: string


    /** Debe contener entre 3 y 80 caracteres
     * @example CalleFalsa
     */
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address:string;


    /** Es un numero telefonico
     * @example 3413214567
     */
    @IsNumber()
    @IsNotEmpty()
    phone:string;

    /** Debe contener entre 5 y 20 caracteres
     * @example Argentina
     */
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
   country?:string;


   /** Debe contener entre 5 y 20 caracteres
     * @example Rosario
     */
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    city?:string

    /**
     * Define si el usuario es administrador
     * @example false
     */
    @IsOptional()
    @IsNotEmpty()
    isAdmin: boolean = false;

    constructor(partial : Partial<CreateUserDTO>){Object.assign(this,partial)}

    }
