import { Order } from "src/modules/orders/order.entity"
import { Product } from "src/modules/Products/product.entity"

export class CreateOrderDetailDto {  
    price:number
    products:Product[]
    order:Order
    }
   
