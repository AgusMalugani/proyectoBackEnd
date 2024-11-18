import { Injectable } from "@nestjs/common";
import { IProducts, productsArray } from "src/mocks/products";
import { UpdateProductDto } from "./dto/update-product.dto"; 

@Injectable()
export class ProductsRepository{
    async getProducts(){
        const products:IProducts[] = await productsArray;
        return products;
    }

    async createProduct(product:IProducts){
        const products = await productsArray.push(product);
        return product;
    }

    async updateProduct( id:number,prod:UpdateProductDto){
        const prodOriginal = await productsArray.find(produ=>produ.id===id)

        if(prodOriginal){
            Object.keys(prod).forEach(key=>{
                prodOriginal[key]= prod[key]
            })
        }

        return prodOriginal;
    }

    async findOneProduct(id:number){
        const product = await productsArray.find(prod=>prod.id=== id);
        return product;
    }

    async deleteProduct(id:number){
        const productIndex = await productsArray.findIndex(prod=>prod.id === id)
        productsArray.splice(productIndex,1)
       return productsArray;
    }


};