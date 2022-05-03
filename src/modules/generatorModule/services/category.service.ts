import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../../schemas/category.schema';
import { Topic } from '../../../schemas/topic.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<Topic>,
  ) {}

  async findAll(topicId): Promise<Category[]> {
    // const categories = await this.topicModel
    //   .aggregate<Category>([
    //     {
    //       $unwind: '$categories',
    //     },
    //   ])
    //   .exec();
    const topics: Topic[] = await this.topicModel.find({ _id: topicId }).exec();
    if (topics.length > 0) {
      const categories: Category[] = topics[0].categories;
      return categories;
    } else {
      return <Category[]>[];
    }
  }

  async addCategoryToTopic(
    topicId: number,
    categoryDto: Category,
  ): Promise<Topic> {
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      { $push: { categories: categoryDto } },
      { new: true },
    );
  }

  async update(topicId, categoryId, newCategory: Category): Promise<Topic> {
    await this.topicModel.updateOne(
      { _id: topicId, 'categories._id': categoryId },
      { $set: { 'categories.$': newCategory } },
    );
    return await this.topicModel.findOne({ _id: topicId });
  }

  async delete(topicId, categoryId): Promise<Topic> {
    await this.topicModel.updateOne<Topic>(
      { _id: topicId, 'categories._id': categoryId },
      { $pull: { categories: { _id: categoryId } } },
    );
    return await this.topicModel.findOne({ _id: topicId });
  }

  async getGategory(topicId, categoryId): Promise<Category> {
    const topics: Topic[] = await this.topicModel.find({ _id: topicId }).exec();
    if (topics.length > 0) {
      let foundedCategory = null;
      for (const category of topics[0].categories) {
        if (category._id == categoryId) {
          foundedCategory = category;
          break;
        }
      }
      return foundedCategory;
    } else {
      return null;
    }
  }
}
