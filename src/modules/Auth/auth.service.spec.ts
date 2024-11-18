import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../Users/users.service';
import { User } from '../Users/entities/user.entity'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../Users/dto/create-user.dto';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

/*
describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService : Partial<UsersService>;

  beforeEach(async () => {
    mockUsersService={
      getOneUserByEmail : ()=> Promise.resolve(undefined),
      createUserService: (user : Partial<User>)=> Promise.resolve( {
        ...user,
        isAdmin:true,
        id:"1234fs-1234fs-1234fs-1234fs"
      } as User )
    }
    
  const mockJwtService = {
    sign: (payload)=> jwt.sign(payload,"testSecret")
  }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,{provide:getRepositoryToken(User),useValue:{}},
        {provide:JwtService, useValue:mockJwtService},
        {provide:UsersService, useValue:mockUsersService}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });


  const mockUser= new SignUpDto({
    name:"John doe",
    email:"johndoe@email.com",
    password:"123456",
    confirmPassword:"123456"
  })
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("signUp() creacion de usuario con contraseña encriptada",async ()=>{
    const user = await service.signUpUser(mockUser);
   // console.log(user);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("isAdmin",true)
    expect(user).toHaveProperty("password");
  })


  it("singIn() tire error si el usuario no existe" ,async ()=>{
try {
 const user = await service.signInUser(mockUser)
 
} catch (error) {
  expect(error.message).toEqual("Usuario incorrecto")
}

  } )



  it("singIn() ", async () =>{
    const mockUserModificado:User = {
      ...mockUser,
      id:"2313",
      orders: [],
      isAdmin: false,
      password :await bcrypt.hash(mockUser.password,10)
    }
     mockUsersService.getOneUserByEmail = (email : string)=> Promise.resolve(mockUserModificado as User);


    const response = await service.signInUser(mockUser);
    
    expect(response).toBeDefined();
    
  
})
  

});

*/