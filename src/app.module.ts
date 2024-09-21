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
import TypeOrmConfig from "./config/dataSource"
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[TypeOrmConfig]
  }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => configService.get("dataSource"),
     }),
     
  UsersModule,ProductsModule,AuthModule, CategoriesModule, OrdersModule, OrderDetailsModule, SeederModule],
  controllers: [],
  providers: [{
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
})
export class AppModule {}
