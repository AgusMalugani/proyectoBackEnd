import { Order } from "src/modules/orders/entities/order.entity";
import { Product } from "src/modules/Products/entities/product.entity"; 
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id : string = uuid();
    @Column()
    price:number
    @OneToOne(()=>Order,(order)=>order.orderDetails)
    order:Order
    @ManyToMany(()=>Product,(prod)=>prod.orderDetails)
    @JoinTable()
    products:Product[]
}
