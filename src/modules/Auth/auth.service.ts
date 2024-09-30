import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from './../Users/users.repository';
import { LoginUserDTO } from "./dto/loginUserDTO";
import { SignUpDto } from "./dto/signup.dto";
import { UsersService } from "../Users/users.service";
import * as bcrypt from "bcrypt"; 
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO } from "../Users/dto/create-user.dto";



@Injectable()
export class AuthService{
constructor(private readonly usersService : UsersService,
    private readonly jwtService : JwtService
 ){}


async signUpUser(user: SignUpDto){
const newUser = await this.usersService.getOneUserByEmail(user.email);
if(newUser){
throw new BadRequestException("ya hay un usuario con ese email");
}


const hashedPassword = await bcrypt.hash(user.password,10);
await this.usersService.createUserService({...user, password:hashedPassword});
return {success: "Usuario guardado con exito"}
}



async signInUser(credentials:LoginUserDTO){
const {email,password} = credentials;

const user = await this.usersService.getOneUserByEmail(email);

if(!user){
    throw new BadRequestException("Usuario incorrecto");
}

const isPasswordValid=await bcrypt.compare(password,user.password)
if(isPasswordValid === false){
throw new BadRequestException("usuario incorrecto");
}

const payload = {
    sub:user.id,
    id:user.id,
    email:user.email
}
const token =  this.jwtService.sign(payload);

return token;
}

}