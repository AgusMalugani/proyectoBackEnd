import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { FileUploadDTO } from './dto/file-upload.dto';
import { ProductsService } from '../Products/products.service';

@Injectable()
export class FileUploadService {
constructor(private readonly cloudinaryService: CloudinaryService){}

    async uploadFile( file:FileUploadDTO, id :string ){
        const url = await this.cloudinaryService.uploadFile(file.buffer,file.originalName);
        return url;
        }

        async getUrl(publicId:string){
            return this.cloudinaryService.getUrl(publicId);
        }
}
