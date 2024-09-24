import { Injectable } from "@nestjs/common";
import { UsersRepository } from './../Users/users.repository';
import { LoginUserDTO } from "./dto/loginUserDTO";



@Injectable()
export class AuthService{
constructor(private userRepository: UsersRepository){}


async getAuth(credentials:LoginUserDTO){
const {email,password} = credentials;

const user = await this.userRepository.findUserEmail(email);

if(user.password === password){
return user;
} else{
    return null;
}

}

}