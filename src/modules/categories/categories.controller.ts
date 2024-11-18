import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(201)
  addCategory(category : CreateCategoryDto){
    return this.categoriesService.addCategory(category);
  }

  @Get()
  @HttpCode(200)
  async getAllCategory(){
    const categories  = this.categoriesService.getAllCategory();
    return {data: categories}
  }

}
