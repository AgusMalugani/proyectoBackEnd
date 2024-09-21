import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
constructor(
  @InjectRepository(Category) private categoryRepository:Repository<Category>
){}

 async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find({relations:{products:true}});
    return categories;
  }

 async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({id});
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    await this.categoryRepository.delete(id);
    return `This action removes a #${id} category`;
  }
}
