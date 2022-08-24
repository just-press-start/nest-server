import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  getRevealedActivitiesByCategoryName(categoryName: string, userId: string) {
    return this.activityRepository.getRevealedActivitiesByCategoryName(
      categoryName,
      userId,
    );
  }

  getActivitiesByCategoryName(categoryName: string) {
    return this.activityRepository.getActivitiesByCategoryName(categoryName);
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

  delete(activityName) {
    return this.activityRepository.delete(activityName);
  }
}
