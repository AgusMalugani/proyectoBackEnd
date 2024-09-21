import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersRepository } from "../Users/users.repository";
import { AuthController } from "./auth.controller";



@Module({
    imports:[],
    controllers:[AuthController],
    providers:[AuthService,UsersRepository]
})
export class AuthModule{}
