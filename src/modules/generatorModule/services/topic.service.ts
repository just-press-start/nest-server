import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from '../../../schemas/topic.schema';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<Topic>,
  ) {}

  async create(topicDto: Topic): Promise<Topic> {
    const newTopic = new this.topicModel(topicDto);
    return newTopic.save();
  }

  async findAll(): Promise<Topic[]> {
    return await this.topicModel.find().exec();
  }

  async update(id, newTopic: Topic): Promise<Topic> {
    await this.topicModel.updateOne({ _id: id }, newTopic);

    return await this.topicModel.findOne({ _id: id });
  }

  async delete(id): Promise<any> {
    return await this.topicModel.findByIdAndRemove(id);
  }
}
