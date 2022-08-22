import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  getActivitiesByCategoryName(categoryName: string, userId: string) {
    return this.activityRepository.getActivitiesByCategoryName(
      categoryName,
      userId,
    );
  }

  async revealActivity(activityName, userId) {
    const result = await this.activityRepository.revealActivity(
      activityName,
      userId,
    );
    const categoryNameQuery = await this.activityRepository.getCategoryName(
      activityName,
    );
    await this.categoryRepository.increaseClickCount(
      categoryNameQuery[0].categoryName,
    );
    return result;
  }
}
