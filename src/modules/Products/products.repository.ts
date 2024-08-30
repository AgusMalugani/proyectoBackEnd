import { Injectable } from "@nestjs/common";
import { IProducts, productsArray } from "src/mocks/products";

@Injectable()
export class ProductsRepository{
    async getProducts(){
        const products:IProducts[] = await productsArray;
        return products;
    }
};