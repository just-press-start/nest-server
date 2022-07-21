import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from '../schemas/content.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/createPostDto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<ContentDocument>,
  ) {}

  async createPost(plotId, createPostDto: CreatePostDto) {
    const updateResult = await this.contentModel.findOneAndUpdate(
      { _id: plotId },
      { $push: { posts: createPostDto } },
      {
        new: true,
      },
    );
    return updateResult;
  }
}
