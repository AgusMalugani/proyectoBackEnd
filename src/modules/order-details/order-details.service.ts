import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
constructor(@InjectRepository(OrderDetail)private orderDetailRepository : Repository<OrderDetail>){}

  async create(orderDetails: CreateOrderDetailDto) {
    const orderDet = await this.orderDetailRepository.create(orderDetails);
    await this.orderDetailRepository.save(orderDet);
    return orderDet;
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
