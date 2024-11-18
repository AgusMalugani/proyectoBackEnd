import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from '../Users/entities/user.entity'; 
import { Product } from '../Products/entities/product.entity'; 
import { UsersService } from '../Users/users.service';
import { ProductsService } from '../Products/products.service';
import { IProducts } from 'src/mocks/products';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';

@Injectable()
export class OrdersService {
 
constructor(
  @InjectRepository(Order) private orderRepository : Repository<Order>,
  private usersService:UsersService,
   private orderDetailService:OrderDetailsService
){}

  

  async addOrder(createOrder: CreateOrderDto) {
    const{products} = createOrder;

    const user = await this.usersService.getOneUserService(createOrder.idUser)
    const fechaHoy = new Date()

const orderCreate = this.orderRepository.create({
  user:user,
  date:fechaHoy
})

const order = await this.orderRepository.save(orderCreate);

const orderDet = await this.orderDetailService.create({products,order});
order.orderDetails = orderDet;
return this.orderRepository.save(order);

  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations:{
      orderDetails:true,
      user:true
    }});
return orders;
  }


  async getOrder(id:string){
    const order = await this.orderRepository.findOne({where:{id},
      relations:{
      orderDetails:true
    }})
  return order;
  }

}
