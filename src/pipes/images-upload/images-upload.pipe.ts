import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagesUploadPipe implements PipeTransform {
  private readonly allowedMimeType =["image/png","image/jpeg","image/jpg","image/gif"]
  private readonly maxSizeInBytes= 200000;//200 kb
  transform(file:Express.Multer.File) {
    if(!file){
      throw new BadRequestException("No existe file");
    }

    if(file.size > this.maxSizeInBytes){
      throw new BadRequestException("el tamaño es mayor a 200kb");
    }

    if(!this.allowedMimeType.includes(file.mimetype)){
      throw new BadRequestException("el archivo no tiene un formato permitido");
    }

    return file;
  }
}
