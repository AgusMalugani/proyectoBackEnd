import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from '../Users/users.module';
import { ProductsModule } from '../Products/products.module';
import { OrderDetailsModule } from '../order-details/order-details.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),UsersModule,ProductsModule,OrderDetailsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
