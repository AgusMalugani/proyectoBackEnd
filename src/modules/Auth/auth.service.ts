import { Injectable } from "@nestjs/common";
import { loginCredentialsDTO } from "src/dto/userDto/loginCredentialsDTO";
import { UsersRepository } from './../Users/users.repository';



@Injectable()
export class AuthService{
constructor(private userRepository: UsersRepository){}
getAllAuth():string{
    return "hello"
}

async getAuth(credentials:loginCredentialsDTO){
const {email,password} = credentials;

const user = await this.userRepository.findUserEmail(email);

if(user.password === password){
return user;
} else{
    return null;
}

}

}