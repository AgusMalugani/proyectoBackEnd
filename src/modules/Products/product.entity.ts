
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Category } from "../categories/category.entity";
import { OrderDetail } from "../order-details/order-detail.entity";
@Entity()
export class Product{
@PrimaryGeneratedColumn("uuid")
id : string = uuid();
@Column()
name: string;
@Column()
description: string;
@Column()
price: number;
@Column()
stock: number;
@Column()
imgUrl: string;
@ManyToOne(()=>Category,(cat)=>cat.products)
category:Category
@ManyToMany(()=>OrderDetail,(orderDet)=>orderDet.products)
orderDetails:OrderDetail[];
}
