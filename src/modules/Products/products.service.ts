import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { IProducts, productsArray } from "src/mocks/products";
import { updateProductDTO } from "src/dto/userDto/updateProductDTO";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }

    async getAllProductsService() {
        const products = await this.productsRepository.find({relations:{category:true,orderDetails:true}});
        if (products) {
            return products;
        }
    }

    async createProductService(product: Product) {

        const producto = await this.productsRepository.create(product);
        await this.productsRepository.save(producto);
        return producto;
    }

    async updateProductService(id: string, prod: updateProductDTO) {
        const productMod = await this.productsRepository.update(id, prod);
        return productMod;
    }

    async getOneProductService(id: string) {
        const prod = await this.productsRepository.findOneBy({ id });
        return prod;
    }
    async deleteProductService(id: string) {
        const products = await this.productsRepository.delete(id);
        return products;
    }

    async buyProductService(id: string) {
        const producto = await this.getOneProductService(id);
        if (producto.stock > 0) {
            console.log(producto.stock);
            //stock antes de restar
            await this.updateProductService(id, { stock: (producto.stock - 1) })
            //tengo que verificar si realmente se modifica el stock
            return producto.price;
        }
        return
    }


}