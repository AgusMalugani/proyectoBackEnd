import { Injectable } from "@nestjs/common";
import { IUser, usersArray } from "src/mocks/users";

@Injectable()
export class UsersRepository{

    async getUsers(){
        const users:IUser[] = await usersArray;
        return users;
    }


}