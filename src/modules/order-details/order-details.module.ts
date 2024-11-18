import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { ProductsService } from '../Products/products.service';
import { ProductsModule } from '../Products/products.module';
import { Product } from '../Products/entities/product.entity';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrderDetail,Product]),ProductsModule,FileUploadModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports:[OrderDetailsService]
})
export class OrderDetailsModule {}
