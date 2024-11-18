import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller'; 
import { UsersService } from '../Users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../Users/dto/create-user.dto'; 
import { User } from '../Users/entities/user.entity'; 
import * as bcrypt from "bcrypt"
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in-dto'; 
import * as jwt from "jsonwebtoken"
/*

describe('AuthController', () => {
  let controller: AuthController;
  let mockUsersService : Partial<UsersService>;
  let mockAuthService : Partial<AuthService>;

  beforeEach(async () => {
    mockUsersService={
      getOneUserByEmail:async (email:string)=> { if(email=== "johndoe2@email.com"){
       return {
          ...mockUser,
           isAdmin:true,
          id:"1234fs-1234fs-1234fs-1234fs",
          password:await bcrypt.hash(mockUser.password,10),
          orders:[]
        } as User
      } else{
          return Promise.resolve(undefined)
      }
    },
      createUserService:async ()=>Promise.resolve({
        ...mockUser,
         isAdmin:true,
        id:"1234fs-1234fs-1234fs-1234fs",
        //password:await bcrypt.hash(mockUser.password,10),
        orders:[]
      } as User )
    }

    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[AuthService,{provide:getRepositoryToken(User), useValue:{}},
        {provide:UsersService,useValue:mockUsersService},{provide:JwtService,useValue:{sign: (payload)=> jwt.sign(payload,"testSecret")}}]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
  const mockUser= new SignUpDto({
    name:"John doe",
    email:"johndoe2@email.com",
    password:"123456",
    confirmPassword:"123456"
  })

  const mockCredentials = new LoginUserDTO({
    email:"johndoe2@email.com",
    password:"123456",
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

/*it("signUp()",async ()=>{
 
 const user = await controller.singUp(mockUser);
 expect(user).toBeDefined()
})*/
/*
it("signIn()",async ()=>{
  const user = await controller.login(mockCredentials);
  console.log(user);
  expect(user).toBeDefined()
  

})

});
*/