import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Activity } from '../../../schemas/activity.schema';
import { Achievement } from '../../../schemas/achievement.schema';
import { AchievementService } from '../services/achievement.service';

@Controller(
  'topics/:topicId/categories/:categoryId/activities/:activityId/achievements',
)
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  async createAchievement(
    @Res() response,
    @Body() achievementDto: Achievement,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
  ) {
    const newAchievement =
      await this.achievementService.addAchievementToActivity(
        topicId,
        categoryId,
        activityId,
        achievementDto,
      );
    return response.status(HttpStatus.CREATED).json({
      newAchievement,
    });
  }

  @Get()
  async getAchievement(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
  ) {
    const achievement = await this.achievementService.getAchievement(
      topicId,
      categoryId,
      activityId,
    );
    console.log(achievement);
    return response.status(HttpStatus.OK).json({
      achievement,
    });
  }

  @Put()
  async update(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
    @Body() achievement: Achievement,
  ) {
    const updatedActivity = await this.achievementService.update(
      topicId,
      categoryId,
      activityId,
      achievement,
    );
    return response.status(HttpStatus.OK).json({
      updatedActivity,
    });
  }

  @Delete()
  async delete(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
  ) {
    const deletedActivity = await this.achievementService.delete(
      topicId,
      categoryId,
      activityId,
    );
    return response.status(HttpStatus.OK).json({
      deletedActivity,
    });
  }
}
