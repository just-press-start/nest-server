import { Injectable } from '@nestjs/common';
import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getCategoriesWithProgressWithTopics(deviceId: string): any {
    return this.categoryRepository.getCategoriesWithProgressWithTopics(
      deviceId,
    );
  }

  getMostPopularCategories() {
    return this.categoryRepository.getMostPopularCategories();
  }

  getCategory(categoryName: string) {
    return this.categoryRepository.getCategory(categoryName);
  }
}
