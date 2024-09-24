import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IUser } from "src/mocks/users";
import { updateUserDTO } from "src/dto/userDto/updateUserDTO";
import { Response } from "express";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("/users")

export class UsersController{
    constructor(private readonly usersService : UsersService){}

@Get()
async getAllUsers(@Res() res : Response, @Query("page") page:number,@Query("limit") limit:number){
    const paginaActual = page ? page : 1;
    const limiteActual = limit ? limit : 5 ;
    const users= await this.usersService.getAllUsersService(paginaActual,limiteActual);
    res.status(200).json(users);
    if(!users){
        throw new HttpException({status:400,error:"no hay usuarios que mostrar"},HttpStatus.BAD_REQUEST)
    }
}

@Post("create")
async createUser(@Body() user : CreateUserDTO, @Res() res : Response){
    const usuario = await this.usersService.createUserService(user);
    res.status(201).json(usuario)
    }

@Put("update/:id")
async updateUser(@Param("id",ParseUUIDPipe) id:string, @Body() user :updateUserDTO,@Res() res : Response ){
    const userMod= await this.usersService.updateUserService(Number(id),user);
    res.status(200).json({
    mesagge:"Usuario modificado",
    data: userMod
    })
}

@Get(":id")
async getOneUser(@Param("id",ParseUUIDPipe) id:string, @Res() res : Response ){
    const user= await this.usersService.getOneUserService(id);
    res.status(200).json(user);
    if(!user){
        throw new HttpException({status:400,error:"no hay usuarios con ese id"},HttpStatus.BAD_REQUEST)
    }
}

@Delete("delete/:id")
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