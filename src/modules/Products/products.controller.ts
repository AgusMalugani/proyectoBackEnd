import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { IProducts } from "src/mocks/products";
import { Response } from "express";
import { updateProductDTO } from "src/dto/userDto/updateProductDTO";
import { AuthGuard } from "src/guards/auth.guard";
import { Product } from "./product.entity";


@Controller("/products")
export class ProductsController{
constructor(private readonly productsService : ProductsService ){}

@Get()
@UseGuards(AuthGuard)
async getAllProducts(@Res() res : Response){
    const products = await this.productsService.getAllProductsService();
    res.status(200).json(products);
}


@Post("create")
async createProduct(@Body() product :Product , @Res() res : Response){
  const producto = await this.productsService.createProductService(product);
  res.status(201).json(producto);
    }


@Put("update/:id")
async updateProduct(@Param("id") id:string, @Body() product:updateProductDTO  ,@Res() res : Response ){
    const prod = await this.productsService.updateProductService(id,product);
    res.status(200).json(prod);
}

@Get(":id")
async getOneProduct(@Param("id") id:string, @Res() res : Response ){
 const producto = await this.productsService.getOneProductService(id);
 res.status(200).json(producto);
}

@Delete("delete/:id")
async deleteProduct(@Param("id") id:string,@Res() res : Response ){
const products = await this.productsService.deleteProductService(id);
res.status(200).json(products);
}


}
