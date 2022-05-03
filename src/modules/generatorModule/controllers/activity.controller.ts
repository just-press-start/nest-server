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
import { CategoryService } from '../services/category.service';
import { Category } from '../../../schemas/category.schema';
import { Activity } from '../../../schemas/activity.schema';
import { ActivityService } from '../services/activity.service';

@Controller('topics/:topicId/categories/:categoryId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createCategory(
    @Res() response,
    @Body() activityDto: Activity,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
  ) {
    const newActivity = await this.activityService.addActivityToCategory(
      topicId,
      categoryId,
      activityDto,
    );
    return response.status(HttpStatus.CREATED).json({
      newActivity,
    });
  }

  @Get()
  async findAll(@Res() response) {
    const activities = await this.activityService.findAll();
    return response.status(HttpStatus.OK).json({
      activities,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() activity: Activity) {
    const updatedActivity = await this.activityService.update(id, activity);
    return response.status(HttpStatus.OK).json({
      updatedActivity,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedActivity = await this.activityService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedActivity,
    });
  }
}
