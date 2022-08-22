import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Activity } from '../../entities/Activity';
import { Topic } from '../../entities/Topic';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  getUserActivitiesQuery() {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.activities', 'activity')
      .innerJoin('activity.category', 'category')
      .select(
        'category.name as category_name, category.img as category_img, category.topicId as topic_id',
      )
      .addSelect('COUNT(activity.id)', 'user_activity_count')
      .groupBy('category_name, topic_id')
      .getSql();
  }

  getActivitiesQuery(): string {
    return this.activityRepository
      .createQueryBuilder('activity')
      .innerJoin('activity.category', 'category')
      .select(
        'category.name as category_name, category.topicId as topic_id, COUNT(activity.id) as activity_count',
      )
      .groupBy('category_name, topic_id')
      .getSql();
  }

  getTopicsQuery() {
    return this.topicRepository
      .createQueryBuilder()
      .select('id, name as topic_name, img as topic_img')
      .getSql();
  }

  getCategoriesWithProgress() {
    return this.entityManager
      .createQueryBuilder()
      .select(
        'user_activities.topic_id, user_activities.category_name, user_activities.category_img, user_activities.user_activity_count, all_activities.activity_count',
      )
      .from('(' + this.getUserActivitiesQuery() + ')', 'user_activities')
      .innerJoin(
        '(' + this.getActivitiesQuery() + ')',
        'all_activities',
        'user_activities.category_name = all_activities.category_name',
      )
      .getSql();
  }

  async getCategoriesWithProgressWithTopics() {
    const queryResult = await this.entityManager
      .createQueryBuilder()
      .select(
        'topic_name, topic_img, category_name, category_img, activity_count, user_activity_count',
      )
      .from('(' + this.getCategoriesWithProgress() + ')', 'categories')
      .innerJoin(
        '(' + this.getTopicsQuery() + ')',
        'topic',
        'categories.topic_id = topic.id',
      )
      .getRawMany();
    const result = this.categoryMapper.mapper(queryResult);
    return result;
  }

  async increaseClickCount(categoryName: string) {
    return await this.categoryRepository
      .createQueryBuilder()
      .update('Category')
      .set({
        click: () => 'click + 1',
      })
      .where('name=:categoryName', { categoryName })
      .execute();
  }

  //TEMP

  // i can't use
  getUserActivities(deviceId) {
    return this.topicRepository
      .createQueryBuilder('topic')
      .select(
        'topic.name as topic_name, topic.img as topic_img, category.name as category_name, category.img as category_img, user.device_id as user_device_id, COUNT(activity.id) as count',
      )
      .innerJoin('topic.category', 'category')
      .innerJoin('category.activity', 'activity')
      .leftJoin('activity.users', 'user', 'user.device_id=:deviceId', {
        deviceId,
      })
      .groupBy(
        'topic_name, topic_img, category_name, category_img, user_device_id',
      )
      .getRawMany();
  }
}
