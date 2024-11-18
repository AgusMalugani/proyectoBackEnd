import { Order } from "src/modules/orders/entities/order.entity"
import { Product } from "src/modules/Products/entities/product.entity" 

export class CreateOrderDetailDto {  
  
    products:Product[]
    order:Order
    }
   
