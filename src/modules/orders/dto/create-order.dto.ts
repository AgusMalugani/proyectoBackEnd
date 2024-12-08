import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/modules/Products/entities/product.entity"

export class CreateOrderDto {
    /** Debe contener un UUID v4 valido
     * @example 3f5b02d7-e458-4e1a-9a9f-99d828b0b64e
     */
    @IsUUID('4')
    @IsNotEmpty()
    idUser:string

    /** Debe ser un array y contener almenos un producto
     * @example [{id:8f2b02d6-q548-6a1s-6w4f-77q868b5q64e}]
     */
    @IsArray()
    @ArrayMinSize(1)
    products:Product[]
}
