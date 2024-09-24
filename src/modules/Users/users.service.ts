import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { IUser, usersArray } from "src/mocks/users";
import { updateUserDTO } from "src/dto/userDto/updateUserDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";

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

   async createUserService( user:CreateUserDTO){
       const users = await this.usersRepository.create(user);
       await this.usersRepository.save(users);
    return users;
    }

async updateUserService(id :number,user:updateUserDTO){
//const userMod = await this.usersRepository.update(id,user);
//return userMod;

}


async getOneUserService(id:string){
const user = await this.usersRepository.findOneBy({id});
return user;
}

async deleteUserService(id:string){
    const users = await this.usersRepository.delete(id);
return users;
}

}