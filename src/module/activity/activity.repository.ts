import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../../entities/Activity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  getActivitiesByCategoryName(categoryName: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .select('activity.name, activity.img, user.device_id')
      .leftJoin('activity.users', 'user')
      .where('activity.categoryName = :categoryName', {
        categoryName,
      })

      .getRawMany();
  }
}
