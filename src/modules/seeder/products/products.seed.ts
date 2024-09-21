import { Injectable } from "@nestjs/common";
import {products} from "./products.mock"
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/modules/Products/product.entity";
import { Repository } from "typeorm";
import { Category } from "src/modules/categories/category.entity";
@Injectable()
export class ProductsSeed{
constructor(
    @InjectRepository(Product) private readonly productsRepository : Repository<Product>,
    @InjectRepository(Category) private readonly categoriesRepository : Repository<Category>
){}

async findCategoryByName(category:string){
const categoria = await this.categoriesRepository.findOneBy({name: category});
if(!categoria){
throw new Error("No  se encuentra esa categoria")
} else{
    return categoria;
}
}

async seed (){
    const productosExistentes = await this.productsRepository.find();
    const nombreProductos = productosExistentes.map((producto)=>producto.name)

for (const productData of products) {
    if(!nombreProductos.includes(productData.name) ){ 
        const product = new Product();
        product.description = productData.description;
        product.name=productData.name;
        product.price=productData.price;
        product.stock = productData.stock;
        product.imgUrl="imgUrl"
        product.category= await this.findCategoryByName(productData.category);
       await this.productsRepository.save(product);
    }
}
}

}