import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Order } from "../orders/order.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();
    @Column()
    email: string
    @Column()
    name: string
    @Column()
    password: string
    @Column()
    address: string
    @Column()
    phone: string
    @Column({nullable:true})
    country: string
    @Column({nullable:true})
    city: string
    @OneToMany(()=>Order,(order)=>order.user)
    orders:Order[]
}