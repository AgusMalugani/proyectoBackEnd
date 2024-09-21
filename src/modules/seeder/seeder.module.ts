import { Module } from '@nestjs/common';
import { ProductsSeed } from './products/products.seed';
import { CategoriesSeed } from './categories/categories.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { Product } from '../Products/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category,Product])],
  providers: [ProductsSeed,CategoriesSeed],
  exports:[ProductsSeed,CategoriesSeed]
})
export class SeederModule {}
