
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Category } from "src/modules/categories/entities/category.entity";
import { OrderDetail } from "src/modules/order-details/entities/order-detail.entity"; 
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
@Entity()
export class Product{
@PrimaryGeneratedColumn("uuid")
id : string = uuid();

@Column()
@IsString()
@MaxLength(50)
@IsNotEmpty()
name: string

@Column()
@IsString()
@IsNotEmpty()
description: string

@Column()
@IsNumber()
@IsNotEmpty()
price: number

@Column()
@IsNumber()
@IsNotEmpty()
stock: number

@Column({default:"img-url"})
@IsString()
imgUrl: string

@ManyToOne(()=>Category,(cat)=>cat.products)
category:Category
@ManyToMany(()=>OrderDetail,(orderDet)=>orderDet.products)
orderDetails:OrderDetail[];

}
