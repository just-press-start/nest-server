import { Controller, Get, Param, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

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
