import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../../entities/Activity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/User';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  getActivitiesByCategoryName(categoryName: string, userId: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .select('activity.name, activity.img, user.device_id')
      .leftJoin(
        'activity.users',
        'user',
        'user.deviceId = :userId OR user.deviceId is null',
        { userId },
      )
      .where('activity.categoryName = :categoryName', {
        categoryName,
      })

      .getRawMany();
  }

  revealActivity(activityName, userId) {
    return this.entityManager
      .createQueryBuilder()
      .relation(User, 'activities')
      .of(userId)
      .add(activityName);
  }

  getCategoryName(activityName: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .select('activity.categoryName')
      .limit(1)
      .getRawMany();
  }
}
