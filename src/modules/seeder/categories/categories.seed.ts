import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { In, Repository } from "typeorm";
import {categories} from "./categories.mock"

@Injectable()

export class CategoriesSeed{
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ){}

async seed(){
const categoriasExistentes = await this.categoryRepository.find({
    where:{name : In(categories)}
})

for (const nombreCategoria of categories) {
    if(!categoriasExistentes.some((category)=>{category.name === nombreCategoria})){
        //si el nombre de la categoria no esta en la bd, entonces da true, y entra al if
        const categoria = new Category();
        categoria.name = nombreCategoria;
       await this.categoryRepository.save(categoria);
    }
}

}



}