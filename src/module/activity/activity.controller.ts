import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:categoryName')
  getActivitiesByCategoryName(@Param('categoryName') categoryName: string) {
    return this.activityService.getActivitiesByCategoryName(categoryName);
  }
}
