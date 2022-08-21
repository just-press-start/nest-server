import { Injectable } from '@nestjs/common';
import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findAll(): any {
    return this.categoryRepository.getCategoriesWithProgress();
  }
}
