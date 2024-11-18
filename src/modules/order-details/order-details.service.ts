import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../Products/products.service';

@Injectable()
export class OrderDetailsService {
constructor(@InjectRepository(OrderDetail)private orderDetailRepository : Repository<OrderDetail>,
private productsService : ProductsService){}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const{products,order}= createOrderDetailDto

    let precio =  0;
if(products.length<1){
throw new BadRequestException("No hay productos")
}

for (const productId of products) {
precio = precio + await this.productsService.buyProductService(productId.id);
}
    
    const orderDet = this.orderDetailRepository.create({
      products: products,
      price:precio,
      order:order,
    })
  return this.orderDetailRepository.save(orderDet);
     }

  async findAll() {
    return this.orderDetailRepository.find({
      relations :{ products : true , order:true}
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
