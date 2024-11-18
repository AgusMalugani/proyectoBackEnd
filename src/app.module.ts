import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module'; 
import { ProductsModule } from './modules/Products/products.module';
import { AuthModule } from './modules/Auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/order-details/order-details.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import TypeOrmConfig from "./config/dataSource"
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './modules/Auth/auth.service';
import { UsersService } from './modules/Users/users.service';
import { AuthController } from './modules/Auth/auth.controller';
import { User } from './modules/Users/entities/user.entity'; 
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[TypeOrmConfig]
  }),
  TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => configService.get("dataSource"),
     }),
     
  UsersModule,
  ProductsModule,
  AuthModule,
   CategoriesModule, 
   OrdersModule,
    OrderDetailsModule,
     SeederModule,
      FileUploadModule,
JwtModule.register({
  global:true,
  secret:process.env.JWT_SECRET,
  signOptions:{expiresIn:"60m"}
})
],
  controllers: [AuthController],
  providers: [//{
    //provide:APP_GUARD,
    //useClass:AuthGuard
  //},
   CloudinaryService,
    AuthService,
     UsersService],
})
export class AppModule {}
