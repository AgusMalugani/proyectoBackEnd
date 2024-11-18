import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../Users/users.service";
import * as bcrypt from "bcrypt"; 
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO } from "../Users/dto/create-user.dto";
import { Role } from "src/enum/role.enum";
import { SignInDto } from "./dto/sign-in-dto";



@Injectable()
export class AuthService{
constructor(private readonly usersService : UsersService,
    private readonly jwtService : JwtService
 ){}


async signUpUser(user: CreateUserDTO){
    const usuarioExistente = await this.usersService.getOneUserByEmail(user.email);

    if(usuarioExistente){
      throw new BadRequestException("Ya existe un usuario con ese email");
    }

    if(user.password !== user.repeatPassword){
      throw new BadRequestException("Las contraseñas deben coincidir");
    }

const passwordHash = await bcrypt.hash(user.password,10);

const newUser = await this.usersService.createUserService({...user,password:passwordHash});

return newUser;
}



async signInUser(credentials:SignInDto){
const {email,password} = credentials;
console.log(email, password);

const user = await this.usersService.getOneUserByEmail(email);

if(!user){
    throw new BadRequestException("Usuario incorrecto");
}
const verificacionPassword = await bcrypt.compare(password, user.password);

if(verificacionPassword === false){
throw new BadRequestException("usuario incorrecto");
}

const payload = {
    sub:user.id,
    id:user.id,
    email:user.email,
    roles:[user.isAdmin ? Role.Admin : Role.User]
}
const token =  this.jwtService.sign(payload);

return token;
}

}