import { Injectable } from '@nestjs/common';
import { v2 as cloudinary,UploadApiOptions} from 'cloudinary';
@Injectable()
export class CloudinaryService {
 
constructor(){
    
    cloudinary.config({
        cloud_name:'dxt4qdckz',
        api_key:'197318164753668',
        api_secret: "pz4y3XmsFA1T_gmY0EGiPArC53Q"
    });
}


async uploadFile(buffer:Buffer, originalName?:string) :Promise<string>{
    const options: UploadApiOptions = {
    folder : "uploads", // si no existe la carpeta la crea.
    public_id: originalName,
    RESOURCE_TYPE:"AUTO",
    };
    
    return new Promise( (resolve,reject)=>{
    const stream = cloudinary.uploader.upload_stream(
    options,
    (error,result)=>{
    error? reject(error) : resolve(result.secure_url);
    },
    );
    stream.write(buffer); // para sobrescribir
    stream.end();
    } )
    }

    async getUrl(publicId:string):Promise<string>{
        const result = cloudinary.api.resource(publicId);
        return result;
        }





}
