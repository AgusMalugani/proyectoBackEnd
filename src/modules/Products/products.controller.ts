import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from "@nestjs/common";
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
async updateProduct(@Param("id",ParseUUIDPipe) id:string, @Body() product:updateProductDTO  ,@Res() res : Response ){
    
        const prod = await this.productsService.updateProductService(id,product);
        res.status(200).json(prod);
    if(!prod){
        throw new HttpException({status:400,error:"no se encuentra ese producto"},HttpStatus.BAD_REQUEST);
    }
    
}

@Get(":id")
async getOneProduct(@Param("id",ParseUUIDPipe) id:string, @Res() res : Response ){
 const producto = await this.productsService.getOneProductService(id);
 res.status(200).json(producto);
 if(!producto){
    throw new HttpException({status:400,error:"no se encuentra ese producto"},HttpStatus.BAD_REQUEST);
}

}

@Delete("delete/:id")
async deleteProduct(@Param("id",ParseUUIDPipe) id:string,@Res() res : Response ){
    try{
        const products = await this.productsService.deleteProductService(id);
        res.status(200).json(products);
    }catch(e){
        throw new HttpException({status:400,error:"no se encuentra ese producto", errorMsj:e.message},HttpStatus.BAD_REQUEST);
    }

}


}
