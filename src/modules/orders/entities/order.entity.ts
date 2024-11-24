import { OrderDetail } from "src/modules/order-details/entities/order-detail.entity";
import { User } from "src/modules/Users/entities/user.entity"; 
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
@Entity()
export class Order {
    /** Debe contener un UUID v4 valido
     * @example 3f5b02d7-e458-4e1a-9a9f-99d828b0b64e
     */
    @PrimaryGeneratedColumn("uuid")
id : string = uuid();

/** Se genera automaticamente con la fecha de creacion de la orden
     *
     */
@Column()
date:Date

@OneToOne(()=>OrderDetail,(orderDet)=>orderDet.order)
@JoinColumn()
orderDetails:OrderDetail

@ManyToOne(()=>User,(user)=>user.orders)
user:User
}
