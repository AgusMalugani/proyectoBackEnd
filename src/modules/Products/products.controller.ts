import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Product } from "./entities/product.entity"; 
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/enum/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagesUploadPipe } from "src/pipes/images-upload/images-upload.pipe";

@ApiTags("Products")
@Controller("/products")
export class ProductsController{
constructor(private readonly productsService : ProductsService ){}

@Get()
@Roles(Role.User)
@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth()
@HttpCode(200)
async getAllProducts(){
    const products = await this.productsService.getAllProductsService();
   return products;
}


@Post("create")
@Roles(Role.User)
@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth()
@HttpCode(201)
async createProduct(@Body() product :Product){
  const producto = await this.productsService.createProductService(product);
return {message:"Producto creado",data:producto};
    }


@Put("update/:id")
@Roles(Role.Admin)
@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth()
@HttpCode(200)
async update(@Param('id', new ParseUUIDPipe({version:"4"})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.updateProductService(id, updateProductDto);
  }

@Get(":id")
@Roles(Role.User)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@HttpCode(200)
async getOneProduct(@Param("id", new ParseUUIDPipe({version:"4"})) id:string ){
 const producto = await this.productsService.getOneProductService(id);
 return producto;

}

@Delete("delete/:id")
@Roles(Role.Admin)
@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth()
@HttpCode(200)
async deleteProduct(@Param("id", new ParseUUIDPipe({version:"4"})) id:string){
    try{
        const products = await this.productsService.deleteProductService(id);
        return {message: "Producto eliminado", data: products};
    }catch(e){
        throw new HttpException({status:400,error:"no se encuentra ese producto", errorMsj:e.message},HttpStatus.BAD_REQUEST);
    }
}


@Post(":id/upload")
@UseInterceptors(FileInterceptor("file"))
@HttpCode(200)
async uploadFile(@Param("id") id:string, @UploadedFile( new ImagesUploadPipe()) file : Express.Multer.File ){
 const prod= await this.productsService.uploadFile({
    buffer:file.buffer,
    fieldName:file.fieldname,
    mimeType:file.mimetype,
    originalName:file.originalname,
    size:file.size
  },id);
  return {
    message:"Imagen cargada con exito",
    data:prod
  }
}




}
