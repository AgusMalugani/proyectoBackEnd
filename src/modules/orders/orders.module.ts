import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { UsersService } from '../Users/users.service';
import { ProductsService } from '../Products/products.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { UsersModule } from '../Users/users.module';
import { ProductsModule } from '../Products/products.module';
import { OrderDetailsModule } from '../order-details/order-details.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),UsersModule,ProductsModule,OrderDetailsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
