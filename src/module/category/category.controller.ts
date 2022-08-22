import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPopularCategoriesDto } from './models/dto/GetPopularCategoriesDto';
import { GetDeviceCategoriesDto } from './models/dto/GetDeviceCategoriesDto';
import { GetCategoryDto } from './models/dto/GetCategoryDto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetPopularCategoriesDto],
  })
  @ApiOperation({
    summary: 'why its not working when its at lowest in controller?',
  })
  @Get('/popular')
  async getMostPopularCategories(): Promise<GetPopularCategoriesDto[]> {
    return this.categoryService.getMostPopularCategories();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetDeviceCategoriesDto],
  })
  @ApiOperation({
    summary:
      'gets categories grouped by topics. it has user progress data for Topics screen',
  })
  @Get('/device/:deviceId')
  async getCategories(@Param('deviceId') deviceId: string) {
    return this.categoryService.getCategoriesWithProgressWithTopics(deviceId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCategoryDto,
  })
  @ApiOperation({
    summary: 'gets one category by name',
  })
  @Get('/:categoryName')
  async getCategory(@Param('categoryName') categoryName: string) {
    return this.categoryService.getCategory(categoryName);
  }
}
