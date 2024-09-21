import { Product } from "src/modules/Products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id : string = uuid();
    @Column()
    name:string;
    @OneToMany(()=>Product,(prod)=>prod.category)
    products:Product[];

}
