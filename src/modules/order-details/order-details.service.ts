import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
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

for (const product of products) {
precio = precio + await this.productsService.buyProductService(product.id);
}
    
    const orderDet = this.orderDetailRepository.create({
      products: products,
      price:precio,
      order:order,
    })
  return this.orderDetailRepository.save(orderDet);
     }



  async findAll() {
    return this.orderDetailRepository.find();
  }



 async  findOne(id: string) {
    const orderDet= await this.orderDetailRepository.findOne({where:{id},relations:{products:true,order:true}})
    if(!orderDet){
      throw new BadRequestException("No se encontro el detalle de orden con ese id")
        }
        return orderDet;
  }

 
}
