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
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../../../schemas/category.schema';
import { Activity } from '../../../schemas/activity.schema';
import { ActivityService } from '../services/activity.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('topics/:topicId/categories/:categoryId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createActivity(
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

  @Get('/:activityId')
  async getCategory(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
  ) {
    const category = await this.activityService.getActivity(
      topicId,
      categoryId,
      activityId,
    );
    return response.status(HttpStatus.OK).json({
      category,
    });
  }

  @Get()
  async findAll(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
  ) {
    const activities = await this.activityService.findAll(topicId, categoryId);
    return response.status(HttpStatus.OK).json({
      activities,
    });
  }

  @Put('/:activityId')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
    @Body() activity: Activity,
  ) {
    const updatedActivity = await this.activityService.update(
      topicId,
      categoryId,
      activityId,
      activity,
    );
    return response.status(HttpStatus.OK).json({
      updatedActivity,
    });
  }

  @Delete('/:activityId')
  async delete(
    @Res() response,
    @Param('topicId') topicId,
    @Param('categoryId') categoryId,
    @Param('activityId') activityId,
  ) {
    const deletedActivity = await this.activityService.delete(
      topicId,
      categoryId,
      activityId,
    );
    return response.status(HttpStatus.OK).json({
      deletedActivity,
    });
  }
}
