import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../Users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../Users/entities/user.entity';
import { CreateUserDTO } from '../Users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in-dto';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService : Partial<UsersService>;
  const mockUser = new CreateUserDTO ({
    email:"agusmalugani@mail.com",
    password:"12345678",
    repeatPassword:"12345678",
    name:"agustin",
    country:"arg",
    city:"ros",
    address:"ituzaingo",
    phone:"34133333"
  } )

  const credentials = new SignInDto({
  email: mockUser.email,
  password:mockUser.password
  })

  beforeEach(async () => {

     mockUsersService={
      getOneUserByEmail : ()=> Promise.resolve(undefined),
      createUserService: (createUser: CreateUserDTO)=>{
       const user = {
          ...createUser,
          id : "0811e11d-e25b-486d-bc30-12faf7b75586",
          isAdmin : false,
          orders:[]
        } as User;
        return Promise.resolve(user);
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {provide:getRepositoryToken(User),useValue:{}},
        {provide:JwtService, useValue:{}},
        {provide:UsersService, useValue:mockUsersService}],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  it("signUp debe retornar un usuario con el password hasheado", async ()=>{
const user = await service.signUpUser(mockUser);
expect(user).toHaveProperty("id");
expect(user).toHaveProperty("password");
  });



  it("signUp() debe retornar error si el email ya existe", async ()=>{
    mockUsersService.getOneUserByEmail = (email:string)=>
      Promise.resolve(mockUser as User)

try {
  await service.signUpUser(mockUser as User);
} catch (error) {
  expect(error.message).toEqual("Ya existe un usuario con ese email");
}
  })


  it("signIn() debe retornar error si el usuario no se encuentra", async ()=>{
    try {
      await service.signInUser(mockUser as User);
    } catch (error) {
      expect(error.message).toEqual("Usuario incorrecto");
    }
  })

  it("signIn() debe retornar error si la contraseña es incorrecta", async ()=>{
    mockUsersService.getOneUserByEmail= (email : string)=>Promise.resolve(mockUser as User);

    try {
      await service.signInUser(credentials as SignInDto);
    } catch (error) {
     expect(error.message).toEqual("usuario incorrecto"); 
    }
  })



});
