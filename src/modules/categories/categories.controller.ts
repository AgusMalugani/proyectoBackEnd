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
  addCategory(@Body()category : CreateCategoryDto){
    return this.categoriesService.addCategory(category);
  }

  @Get()
  @HttpCode(200)
  async getAllCategory(){
    const categories  = await this.categoriesService.getAllCategory();
    return {data: categories}
  }

  @Delete("delete/:id")
  async deleteCategory(@Param() id:string){
    return await this.categoriesService.deleteCategory(id);
  }

  @Get(":name")
  async getOneCategoryByName(@Param("name") name:string){
    const categoria = await this.categoriesService.findCategoryByName(name);
    console.log(categoria);
    
    return {data: categoria}
  }

}
