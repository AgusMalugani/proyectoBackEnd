import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { IsUUID } from 'class-validator';
import { promises } from 'dns';
/*
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {


    const mockUserService : Partial<UsersService> ={
      createUserService : (user)=> Promise.resolve({
        ...user,
        isAdmin:false,
        id:"b5743c6a-3e4b-4b59-bfd9-fc93ae2fc1a7"
      } as User),
      getOneUserByEmail:(email:string) => Promise.resolve(undefined)
    }


    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide:UsersService, useValue:mockUserService},{provide:getRepositoryToken(User), useValue:{}}],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  const mockUser= new CreateUserDTO({
    name:"John doe",
    email:"johndoe@email.com",
    password:"123456",
    address:"ituzaingo",
    phone:"3413857748",
    
   
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Create User, devuelve un usuario, con su rol en user y un id uuid version 4",async()=>{
   const user = await service.createUserService(mockUser);
   expect(user).toBeDefined();
   expect(user).toHaveProperty("isAdmin",false)
   
   const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
   expect(uuidV4Regex.test(user.id)).toBe(true); // El ID debe cumplir con el formato UUIDv4
  })

  it("GetOneUserByEmail() si no hay usuario retorna undefined",async()=> {
    const user = await service.getOneUserByEmail(mockUser.email);
 expect(user).toBeUndefined()
  })


});
*/