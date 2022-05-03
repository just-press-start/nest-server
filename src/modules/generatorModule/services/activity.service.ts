import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from '../../../schemas/activity.schema';
import { Topic } from '../../../schemas/topic.schema';
import { Category } from '../../../schemas/category.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<Topic>,
  ) {}

  async findAll(topicId, categoryId): Promise<Activity[]> {
    const topic: Topic = await this.topicModel.findOne({ _id: topicId }).exec();
    if (topic) {
      const categories: Category[] = topic.categories;
      const filteredCategories = categories.filter(
        (category) => category.id == categoryId,
      );
      if (filteredCategories) {
        return filteredCategories[0].activities;
      } else {
        return <Activity[]>[];
      }
    } else {
      return <Activity[]>[];
    }
  }

  async addActivityToCategory(
    topicId: number,
    categoryId: number,
    activityDto: Activity,
  ): Promise<Topic> {
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      { $push: { 'categories.$[i].activities': activityDto } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
        ],
        new: true,
      },
    );
  }

  async getActivity(topicId, categoryId, activityId): Promise<Activity> {
    const topic: Topic = await this.topicModel.findOne({ _id: topicId }).exec();
    if (topic) {
      let foundedCategory: Category = null;
      for (const category of topic.categories) {
        if (category._id == categoryId) {
          foundedCategory = category;
          break;
        }
      }
      if (foundedCategory) {
        let foundedActivity: Activity = null;
        for (const activity of foundedCategory.activities) {
          if (activity._id == activityId) {
            foundedActivity = activity;
            break;
          }
        }
        return foundedActivity;
      }
    } else {
      return null;
    }
  }

  async update(
    topicId,
    categoryId,
    activityId,
    newActivity: Activity,
  ): Promise<Topic> {
    await this.topicModel.updateOne(
      {
        _id: topicId,
      },
      { $set: { 'categories.$[i].activities.$[j]': newActivity } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
          { 'j._id': activityId },
        ],
      },
    );

    return await this.topicModel.findOne({ _id: topicId });
  }

  async delete(topicId, categoryId, activityId): Promise<Topic> {
    await this.topicModel.updateOne<Topic>(
      { _id: topicId },
      { $pull: { 'categories.$[i].activities': { _id: activityId } } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
        ],
      },
    );
    return await this.topicModel.findOne({ _id: topicId });
  }
}
