import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProductDto } from "./dto/update-product.dto"; 
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity"; 
import { InjectRepository } from "@nestjs/typeorm";
import { FileUploadService } from "../file-upload/file-upload.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { FileUploadDTO } from "../file-upload/dto/file-upload.dto";
import { CategoriesService } from './../categories/categories.service';


@Injectable()
export class ProductsService {
    
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly fileUploadService : FileUploadService,
    private categoriesService: CategoriesService) { }

    async getAllProductsService() {
        const products = await this.productsRepository.find({relations:{category:true}});
        if (!products) {
            throw new BadRequestException("No hay Productos");
        }
        return products;
    }

    async createProductService(product: CreateProductDto) {
        const categoria = await this.categoriesService.findCategoryByName(product.category?.name)
        
        if(!categoria){
           const newCategory= await this.categoriesService.addCategory(product.category); 
           console.log(newCategory);
           
         const producto =  this.productsRepository.create({...product,category:newCategory});
         return  this.productsRepository.save(producto);
        }
        else{
            
            const producto =  this.productsRepository.create({...product,category:categoria});
         return  this.productsRepository.save(producto);
        }


        
        
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
        if(!prod){
            throw new BadRequestException("No hay productos con la id ingresada");
        }
        return prod;
    }

    async deleteProductService(id: string) {
        const producto = await this.getOneProductService(id);
        const idCategory = producto.category?.id;
        console.log(idCategory);
        const products = await this.productsRepository.delete(id);
        await this.deleteProductAndCategory(idCategory); 
        
        
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

      async deleteProductAndCategory(idCategory : string){
        const categoria = await this.categoriesService.findCategoryById(idCategory)
        if(categoria.products.length < 1){
            await this.categoriesService.deleteCategory(categoria.id)
           
        }
        
      }

}