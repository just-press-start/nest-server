import { Controller, Get, Param } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('/:activityName')
  getActivityAchievement(@Param('activityName') activityName: string) {
    return this.achievementService.getAchievementByActivityName(activityName);
  }

  @Get('/user/:userId')
  getAchievements(@Param('userId') userId: string) {
    return this.achievementService.getAchievements(userId);
  }
}
