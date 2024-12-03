import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpException, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { error } from 'console';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() createOrder: CreateOrderDto) {
   
      const order = await this.ordersService.addOrder(createOrder);
    return {data: order}
   
  }

  @Get()
  @HttpCode(200)
  async findAll() { 
     const orders = await this.ordersService.findAll();
    return {data:orders}
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async findOrder(@Param("id", new ParseUUIDPipe({version:"4"})) id:string){
    const orders = await this.ordersService.getOrder(id);
    return orders
  }
  

}
