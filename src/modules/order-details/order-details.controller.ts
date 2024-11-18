import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, Put } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Order Details")
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
