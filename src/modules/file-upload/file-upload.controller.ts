import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../Products/products.service';
import { ImagesUploadPipe } from 'src/pipes/images-upload/images-upload.pipe';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('files')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService
  ) {}

  @Post("uploadImage/:id")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard)
  async uploadImageProduct(@Param("id") id : string, @UploadedFile(new ImagesUploadPipe()) file : Express.Multer.File ){
    const img = await this.fileUploadService.uploadFile({
      buffer:file.buffer,
       originalName:file.originalname,
       fieldName:file.fieldname,
       mimeType:file.mimetype,
       size:file.size},
        id);
   
    return img;
  }


}
