import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'why its not working when its at lowest in controller?',
  })
  @Get('/popular')
  async getMostPopularCategories() {
    return this.categoryService.getMostPopularCategories();
  }

  @Get('/device/:deviceId')
  async getCategories(@Param('deviceId') deviceId: string) {
    return this.categoryService.getCategoriesWithProgressWithTopics(deviceId);
  }

  @Get('/:categoryName')
  async getCategory(@Param('categoryName') categoryName: string) {
    return this.categoryService.getCategory(categoryName);
  }
}
