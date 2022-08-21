import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  getActivitiesByCategoryName(categoryName: string) {
    return this.activityRepository.getActivitiesByCategoryName(categoryName);
  }
}
