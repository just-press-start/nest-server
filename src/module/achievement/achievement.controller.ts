import { Controller, Get, Param } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('achievement')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('/:activityName')
  getActivity(@Param('activityName') activityName: string) {
    return this.achievementService.getAchievementByActivityName(activityName);
  }
}
