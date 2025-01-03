import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ProductsService } from '../Products/products.service';
import { ProductsModule } from '../Products/products.module';

@Module({
  imports:[],
  controllers: [FileUploadController],
  providers: [FileUploadService,CloudinaryService],
  exports:[FileUploadService]
})
export class FileUploadModule {}
