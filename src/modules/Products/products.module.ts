import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity"; 
import { FileUploadModule } from "../file-upload/file-upload.module";
import { FileUploadService } from "../file-upload/file-upload.service";
import { CloudinaryService } from "src/service/cloudinary/cloudinary.service";

@Module({
    imports:[TypeOrmModule.forFeature([Product])],
    controllers:[ProductsController],
    providers:[ProductsService,FileUploadService,CloudinaryService],
    exports:[ProductsService]
})
export class ProductsModule{}