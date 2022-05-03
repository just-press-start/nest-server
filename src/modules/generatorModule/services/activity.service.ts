import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from '../../../schemas/activity.schema';
import { Topic } from '../../../schemas/topic.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<Topic>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return await this.topicModel.aggregate<Activity>().exec();
  }

  async addActivityToCategory(
    topicId: number,
    categoryId: number,
    activityDto: Activity,
  ): Promise<Topic> {
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      { $push: { categories: activityDto } },
    );
  }

  async readById(id): Promise<Topic> {
    return await this.topicModel.findById(id).exec();
  }

  async update(id, newActivity: Activity): Promise<Topic> {
    return await this.topicModel.findByIdAndUpdate(id, Topic, newActivity);
  }

  async delete(id): Promise<Topic> {
    return await this.topicModel.findByIdAndRemove(id);
  }
}
