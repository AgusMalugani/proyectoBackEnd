import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateProductDto {
    
@IsString()
@MaxLength(50)
@IsNotEmpty()
name: string

@IsString()
@IsNotEmpty()
description: string

@IsNumber()
@IsNotEmpty()
price: number

@IsNumber()
@IsNotEmpty()
stock: number

@IsString()
imgUrl: string
}
