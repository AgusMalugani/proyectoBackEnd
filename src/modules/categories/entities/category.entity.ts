import { Product } from "src/modules/Products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
@Entity()
export class Category {
    /** Debe ser un UUID version 4
     * 
     */
    @PrimaryGeneratedColumn("uuid")
    id : string = uuid();

    /** Debe contener el nombre de la categoria
     * @example smartphone
     */
    @Column()
    name:string;
    
    @OneToMany(()=>Product,(prod)=>prod.category)
    products:Product[];

}
