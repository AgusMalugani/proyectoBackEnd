import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/modules/Products/product.entity"

export class CreateOrderDto {
    @IsUUID('4', { message: 'El userId debe ser un UUID v4 válido.' })
    @IsNotEmpty()
    idUser:string
    @IsArray({ message: 'products debe ser un array.' })
    @ArrayMinSize(1, { message: 'Debe haber al menos un producto.' })
    products:Product[]
}
