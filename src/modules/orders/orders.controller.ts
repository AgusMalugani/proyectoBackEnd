import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { error } from 'console';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return this.ordersService.addOrder(createOrderDto);
    } catch (e) {
      throw new HttpException({status:400,error:e.message},HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  //@Patch(':id',ParseUUIDPipe)
  //update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
   // return this.ordersService.update(+id, updateOrderDto);
 // }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.ordersService.remove(+id);
  }
}
