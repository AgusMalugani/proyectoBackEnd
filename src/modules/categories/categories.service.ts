import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private readonly categoriesRepository : Repository<Category>){}

addCategory(category : CreateCategoryDto){
  const categoria = this.categoriesRepository.create(category);
return this.categoriesRepository.save(categoria);
 }

 async getAllCategory(){
  return this.categoriesRepository.find();
 }
}
