import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IUser } from "src/mocks/users";
import { UpdateUserDto } from "./dto/update-user.dto"; 
import { Response } from "express";
import { User } from "./entities/user.entity"; 
import { CreateUserDTO } from "./dto/create-user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/enum/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags("Users")
@Controller("/users")

export class UsersController{
    constructor(private readonly usersService : UsersService){}

@Get()
@Roles(Role.User)
@UseGuards(AuthGuard,RolesGuard)
@ApiBearerAuth()
@HttpCode(200)
async getAllUsers(@Query("page") page?:number,@Query("limit") limit?:number){
    const paginaActual = page ? page : 1;
    const limiteActual = limit ? limit : 5 ;
    const users= await this.usersService.getAllUsersService(paginaActual,limiteActual);
    return {data: users}
}

@HttpCode(201)
@Post("create")
async createUser(@Body() user : CreateUserDTO){
    const usuario = await this.usersService.createUserService(user);
    return {data: usuario};
    }

@Put("update/:id")
@UseGuards(AuthGuard)
@HttpCode(200)
async updateUser(@Param("id", new ParseUUIDPipe({version:"4"})) id:string,  @Body() updateUserDto: UpdateUserDto,@Res() res : Response ){
    const userMod= await this.usersService.updateUserService(Number(id),updateUserDto);
  return userMod;
}

@Get(":id")
@UseGuards(AuthGuard)
@HttpCode(200)
async getOneUser(@Param("id", new ParseUUIDPipe({version:"4"})) id:string ){
    const user= await this.usersService.getOneUserService(id);
   return {data:user}
}

@Delete("delete/:id")
@UseGuards(AuthGuard)
@HttpCode(200)
async deleteUser(@Param("id",ParseUUIDPipe) id:string,@Res() res : Response ){
    try{
        const users = await this.usersService.deleteUserService(id);
        res.status(200).json({mesagge:"Usuario eliminado",
            data: users
        });
    } catch(e){
        throw new HttpException({status:400,error:e.message},400);
    }


}


}