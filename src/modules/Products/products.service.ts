import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { IProducts, productsArray } from "src/mocks/products";
import { UpdateProductDto } from "./dto/update-product.dto"; 
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity"; 
import { InjectRepository } from "@nestjs/typeorm";
import { FileUploadService } from "../file-upload/file-upload.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FileUploadDTO } from "../file-upload/dto/file-upload.dto";


@Injectable()
export class ProductsService {
    
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly fileUploadService : FileUploadService) { }

    async getAllProductsService() {
        const products = await this.productsRepository.find({relations:{category:true,orderDetails:true}});
        if (products) {
            return products;
        }
    }

    async createProductService(product: CreateProductDto) {

        const producto =  this.productsRepository.create(product);
        
        return await this.productsRepository.save(producto);;
    }

    async updateProductService(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.findOne({where:{id}});
    if (!product) {
      throw new NotFoundException("No se encontraron productos con la id ingresada");
    }

    for (const key in updateProductDto) {
      product[key] = updateProductDto[key]
    }

    return await this.productsRepository.save(product);
    }

    async getOneProductService(id: string) {
        const prod = await this.productsRepository.findOne({where:{id}})
        return prod;
    }
    async deleteProductService(id: string) {
        const products = await this.productsRepository.delete(id);
        return products;
    }

    async buyProductService(id: string) {
        let precio = 0 ;
        const product = await this.getOneProductService(id);
        if(product.stock > 0){
          precio = product.price;
          product.stock = product.stock-1
          this.productsRepository.save(product);
          return precio;
        }
    }

    async uploadFile(file: FileUploadDTO, id:string){
        const url = await this.fileUploadService.uploadFile(file)
      
      const productMod = await this.updateProductService(id,{imgUrl:url})
    
      return productMod;
    
      }

}