import { Order } from "src/modules/orders/entities/order.entity"
import { Product } from "src/modules/Products/entities/product.entity" 

export class CreateOrderDetailDto {  
  /** Debe ser un array y contener almenos un producto
     * @example products:[{id:8f2b02d6-q548-6a1s-6w4f-77q868b5q64e}]
     */
    products:Product[]
    
    order:Order
    }
   
