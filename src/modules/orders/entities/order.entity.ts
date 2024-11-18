import { OrderDetail } from "src/modules/order-details/entities/order-detail.entity";
import { User } from "src/modules/Users/entities/user.entity"; 
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
id : string = uuid();

@Column()
date:Date

@OneToOne(()=>OrderDetail,(orderDet)=>orderDet.order)
@JoinColumn()
orderDetails:OrderDetail

@ManyToOne(()=>User,(user)=>user.orders)
user:User
}
