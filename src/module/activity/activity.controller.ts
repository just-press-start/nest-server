import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAchievementsDto } from '../achievement/models/dto/GetAchievementsDto';
import { GetActivitiesDto } from './models/dto/GetActivitiesDto';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetActivitiesDto],
  })
  @ApiOperation({ summary: 'Data for if activity revealed or not' })
  @Get('/:categoryName/user/:userId')
  getActivitiesByCategoryName(
    @Param('categoryName') categoryName: string,
    @Param('userId') userId: string,
  ) {
    return this.activityService.getActivitiesByCategoryName(
      categoryName,
      userId,
    );
  }

  @ApiOperation({ summary: 'Triggered when activity is revealed' })
  @Post('/:activityName/user/:userId/reveal')
  revealActivity(
    @Param('activityName') activityName: string,
    @Param('userId') userId: string,
  ) {
    return this.activityService.revealActivity(activityName, userId);
  }
}
