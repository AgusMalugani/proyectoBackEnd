import { Injectable } from "@nestjs/common";
import { IUser, usersArray } from "src/mocks/users";
import { UpdateUserDto } from "./dto/update-user.dto"; 
import { User } from "./entities/user.entity"; 
import { CreateUserDTO } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResponseUserDto } from "./dto/response-user.dto";

@Injectable()
export class UsersService{
    constructor(
       @InjectRepository(User) private usersRepository : Repository<User>
    ){}

    async getAllUsersService(page:number,limit:number){
        const users= await this.usersRepository.find();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = users.slice(startIndex, endIndex);
    if(paginatedItems){
        return paginatedItems;
    }
    }

   async createUserService( createUserDto: CreateUserDTO){
    const newUser= await this.usersRepository.save( this.usersRepository.create(createUserDto) );
    const responseUser = new ResponseUserDto(newUser);
   return responseUser
    }

async updateUserService(id:string,user:UpdateUserDto){
const userMod = await this.usersRepository.update(id,user);
return userMod;

}


async getOneUserService(id:string){
    return await this.usersRepository.findOne({where: {id},relations:{orders:true}});
 
}

async deleteUserService(id:string){
    const users = await this.usersRepository.delete(id);
return users;
}

async getOneUserByEmail(email:string):Promise<User | undefined>{
    return await this.usersRepository.findOne({where:{email}});
 
}

}