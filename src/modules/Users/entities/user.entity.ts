import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Order } from "src/modules/orders/entities/order.entity";
import { Role } from "src/enum/role.enum";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength } from "class-validator";
@Entity()
export class User{
    /**
     * Debe contener el formado UUID v4
     */
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();


    /** Debe contener como maximo 50 caracteres
     * @example ejemplo@ejemplo.com
     */
    @Column()
    @IsEmail()
    @MaxLength(50)
    @IsNotEmpty()
    email: string

    /**
     * El nombre debe tener entre 3 y 80 caracteres
     * @example Agustin
     */
    @Column()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string

    /** Debe contener una mayuscula, un numero y caracter especial
     * @example Ejemplo91.
     */
    @Column()
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    /** Debe contener entre 3 y 80 caracteres
     * @example CalleFalsa
     */
    @Column()
    @IsString()
    address: string

    /** Debe ingresar un numero de celular
     * @example 3412547891
     */
    @Column()
    @IsNumber()
    phone: string

    /** Debe contener entre 5 y 20 caracteres
     * @example Santa fe
     */
    @Column({nullable:true})
    @IsString()
    @MaxLength(50)
    @IsOptional()
    country?: string | undefined

    /** Debe contener entre 5 y 20 caracteres
     * @example Rosario
     */
    @Column({nullable:true})
    @IsString()
    @MaxLength(50)
    @IsOptional()
    city?: string | undefined
    /**
     * Este campo sera por defecto False
     * @default false
     */
    @Column({default:false })
    isAdmin:boolean

    @OneToMany(()=>Order,(order)=>order.user)
    orders:Order[]
}