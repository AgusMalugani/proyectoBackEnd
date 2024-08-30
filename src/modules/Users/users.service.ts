import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { IUser } from "src/mocks/users";

@Injectable()
export class UsersService{
    constructor(private usersRepository : UsersRepository){}
    async getAllUsers(){
        const users= await this.usersRepository.getUsers();
    if(users){
        return users;
    }
    }
}