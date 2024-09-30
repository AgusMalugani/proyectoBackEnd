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
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[TypeOrmConfig]
  }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => configService.get("dataSource"),
     }),
     
  UsersModule,ProductsModule,AuthModule, CategoriesModule, OrdersModule, OrderDetailsModule, SeederModule, FileUploadModule,
JwtModule.register({
  global:true,
  secret:"claveSecreta",
  signOptions:{expiresIn:"60m"}
})
],
  controllers: [],
  providers: [//{
    //provide:APP_GUARD,
    //useClass:AuthGuard
  //},
   CloudinaryService],
})
export class AppModule {}
