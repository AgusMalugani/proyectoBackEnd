import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../Users/users.service";
import { UsersModule } from "../Users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Users/user.entity";



@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthService,UsersService]
})
export class AuthModule{}
