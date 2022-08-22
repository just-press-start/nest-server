import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAchievementsDto } from './models/dto/GetAchievementsDto';
import { GetAchievementDto } from './models/dto/GetAchievementDto';
@ApiTags('achievements')
@Controller('achievements')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('/:activityName')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetAchievementDto,
  })
  getActivityAchievement(
    @Param('activityName') activityName: string,
  ): Promise<GetAchievementDto> {
    return this.achievementService.getAchievementByActivityName(activityName);
  }

  @Get('/user/:userId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetAchievementsDto],
  })
  getAchievements(
    @Param('userId') userId: string,
  ): Promise<GetAchievementsDto[]> {
    return this.achievementService.getAchievements(userId);
  }
}
