import { Controller, Get, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('topics')
@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({
    summary:
      'Get all topics with minimum info. Used in admin panel to select topic',
  })
  @Get()
  getTopics() {
    return this.topicService.getTopics();
  }

  @ApiOperation({ summary: 'get categories of topic' })
  @Get('/:topicName/categories')
  getCategoriesOfTopic(@Param('topicName') topicName: string) {
    return this.topicService.getCategoriesOfTopic(topicName);
  }

  @ApiOperation({ summary: 'get topic with minimum info' })
  @Get('/:topicName')
  getTopicByName(@Param('topicName') topicName: string) {
    return this.topicService.getTopicByName(topicName);
  }
}
