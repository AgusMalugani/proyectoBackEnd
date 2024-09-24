import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { User } from '../Users/user.entity';
import { UsersRepository } from './../Users/users.repository';
import { Product } from '../Products/product.entity';
import { UsersService } from '../Users/users.service';
import { ProductsService } from '../Products/products.service';
import { IProducts } from 'src/mocks/products';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderDetail } from '../order-details/order-detail.entity';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';

@Injectable()
export class OrdersService {
constructor(
  @InjectRepository(Order) private orderRepository : Repository<Order>,
  private usersService:UsersService,
   private productsService:ProductsService,
   private orderDetailService:OrderDetailsService
){}

  

  async addOrder(createOrderDto: CreateOrderDto) {
    const{idUser,products} = createOrderDto;
    const user = await this.usersService.getOneUserService(idUser);   
    if(!user){
      throw new HttpException({status:400,error:"usuario no encontrado"},HttpStatus.BAD_REQUEST);
    } 

    const orderEntity = await this.orderRepository.save( 
      await this.orderRepository.create({
        user, date: new Date()
      })
    );

    let total:number = 0;
   for (const product of products) {
    const producto = await this.productsService.buyProductService(product.id);
    total = total + producto;
   }


   //ahora total tiene el precio total del carrito
   //user 
   //productos
   const orderDetailsDTO = {
    price:total,
    products,
    order:orderEntity,
   }
   const orderDetails= await this.orderDetailService.create(orderDetailsDTO)
   
   orderEntity.orderDetails = orderDetails;

   return this.orderRepository.save(orderEntity);

  }

  findAll() {
    return this.orderRepository.find({
      relations:{
        orderDetails:true,user:true
      }
    });
  }

  findOne(id: string) {
    return this.orderRepository.findOneBy({id:id})
  }

 // update(id: number, updateOrderDto: UpdateOrderDto) {
  //  return `This action updates a #${id} order`;
 // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
