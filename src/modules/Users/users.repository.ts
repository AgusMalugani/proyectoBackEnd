import { Injectable } from "@nestjs/common";
import { updateUserDTO } from "src/dto/userDto/updateUserDTO";
import { IUser, usersArray } from "src/mocks/users";

@Injectable()
export class UsersRepository{

    async getUsers(){
        const users:IUser[] = await usersArray;
        return users;
    }

    async createUser(user:IUser){
       const users= await usersArray.push(user);
        return user;
    }

    async findOneUser(id:number){
        const user = await usersArray.find(user=>user.id=== id);
        return user;
    }

    async updateUser( id:number,user:updateUserDTO){
        const userOriginal = await usersArray.find(user=>user.id===id)

        if(userOriginal){
            Object.keys(user).forEach(key=>{
                userOriginal[key]= user[key]
            })
        }

        return userOriginal;
    }

    async deleteUser(id:number){
        const userIndex = await usersArray.findIndex(user=>user.id === id)
        usersArray.splice(userIndex,1)
       return usersArray;
    }

    async findUserEmail(email:string){
        const user = await usersArray.find(user=>user.email=== email);
        return user;
    }

}