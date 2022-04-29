import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopicDocument, Topic } from '../schemas/topic.schema';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {}

  async create(topicDto: Topic): Promise<Topic> {
    const newTopic = new this.topicModel(topicDto);
    return newTopic.save();
  }

  async findAll(): Promise<Topic[]> {
    return await this.topicModel.find().exec();
  }

  async update(id, topic: Topic): Promise<Topic> {
    return await this.topicModel.findByIdAndUpdate(id, topic, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.topicModel.findByIdAndRemove(id);
  }
}
