import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Activity } from '../../entities/Activity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  getUserActivitiesQuery(): string {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.activities', 'activity')
      .innerJoin('activity.category', 'category')
      .select('category.name as name')
      .addSelect('COUNT(activity.id)', 'activityCount')
      .groupBy('category.name')
      .getSql();
  }

  getActivitiesQuery(): string {
    return this.activityRepository
      .createQueryBuilder('activity')
      .innerJoinAndSelect('activity.category', 'category')
      .select(
        'category.name as name, COUNT(activity.id) as user_activity_count',
      )
      .groupBy('category.name')
      .getSql();
  }

  getCategoriesWithProgress() {
    return this.entityManager
      .createQueryBuilder()
      .from('(' + this.getUserActivitiesQuery() + ')', 'first_query')
      .innerJoin(
        '(' + this.getActivitiesQuery() + ')',
        'second_query',
        'first_query.name = second_query.name',
      )
      .getRawMany();
  }
}
