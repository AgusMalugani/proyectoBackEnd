
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Category } from "src/modules/categories/entities/category.entity";
import { OrderDetail } from "src/modules/order-details/entities/order-detail.entity"; 
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
@Entity()
export class Product{
    /**
     * Debe contener un UUID v4
     */
@PrimaryGeneratedColumn("uuid")
id : string = uuid();

/** Debe contener un maximo de 50 caracteres
     * @example Termo
     */
@Column()
@IsString()
@MaxLength(50)
@IsNotEmpty()
name: string

/** Debe contener una descripcion del producto
     * @example Es de acero y sirve para mantener la temperatura del agua, ya sea calor o frio
     */
@Column()
@IsString()
@IsNotEmpty()
description: string

/** Debe contener el precio del producto
     * @example 15000
     */
@Column()
@IsNumber()
@IsNotEmpty()
price: number

/** Debe contener la cantidad de productos disponibles para la venta
     * @example 10
     */
@Column()
@IsNumber()
@IsNotEmpty()
stock: number

/** Debe contener la url de la imagen del producto
     * @example http://ejemplo.com/imagenProducto
     */
@Column({default:"img-url"})
@IsString()
imgUrl: string

@ManyToOne(()=>Category,(cat)=>cat.products,{cascade:true,eager:false})
category:Category
@ManyToMany(()=>OrderDetail,(orderDet)=>orderDet.products)
orderDetails:OrderDetail[];

}
