import { Product } from "src/modules/Products/product.entity"

export interface CreateOrderDto {
    idUser:string
    products:Product[]
}
