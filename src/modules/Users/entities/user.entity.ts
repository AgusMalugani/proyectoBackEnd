import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Order } from "src/modules/orders/entities/order.entity";
import { Role } from "src/enum/role.enum";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column()
    @IsEmail()
    @MaxLength(50)
    @IsNotEmpty()
    email: string

    @Column()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string

    @Column()
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    password: string

    @Column()
    @IsString()
    address: string

    @Column()
    @IsNumber()
    phone: string

    @Column({nullable:true})
    @IsString()
    @MaxLength(50)
    @IsOptional()
    country?: string | undefined

    @Column({nullable:true})
    @IsString()
    @MaxLength(50)
    @IsOptional()
    city?: string | undefined
    @Column({default:false })
    isAdmin:boolean

    @OneToMany(()=>Order,(order)=>order.user)
    orders:Order[]
}