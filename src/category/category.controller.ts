import { buildPagination } from './../common/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { Category } from './model/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.service.createCategory(category);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const categories = await this.service.findAll(params);

    const rootCategories = categories.filter((categories) => {
      return categories.parent_id === null;
    });
    return buildPagination<Category>(categories, params, rootCategories);
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteById(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.service.updateById(id, category);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    return this.service.updateStatusById(id, status);
  }
}
