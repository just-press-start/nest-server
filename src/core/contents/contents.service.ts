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
    upsertContentDto._id = id;
    return await this.contentModel.updateOne(
      { _id: upsertContentDto._id },
      upsertContentDto,
    );
  }

  async findAll(): Promise<ContentsReturnType> {
    const contents: Content[] = await this.contentModel.find().exec();
    return { contents: contents };
  }

  async deleteAll(): Promise<any> {
    return await this.contentModel.deleteMany();
  }
}
