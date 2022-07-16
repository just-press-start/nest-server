import { UpsertContentDto } from './dtos/upsertContentDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from 'src/schemas/content.schema';
import { Model } from 'mongoose';
import { ContentsReturnType } from './types';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<ContentDocument>,
  ) {}

  async upsertContent(id, upsertContentDto: UpsertContentDto) {
    console.log(upsertContentDto);
    upsertContentDto._id = id;
    if (upsertContentDto.type == 'blog') {
      upsertContentDto.posts = [];
    }
    if (upsertContentDto.type == 'images') {
      upsertContentDto.images = [];
    }
    return this.contentModel.updateOne(
      { _id: upsertContentDto._id },
      upsertContentDto,
      { upsert: true },
    );
  }

  async findAll(): Promise<ContentsReturnType> {
    const contents: Content[] = await this.contentModel.find().exec();
    return { contents: contents };
  }

  async findByPlotId(plotId) {
    const content: Content = await this.contentModel
      .findOne({ _id: plotId })
      .exec();
    return content;
  }

  async deleteAll(): Promise<any> {
    return await this.contentModel.deleteMany();
  }
}
