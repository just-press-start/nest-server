import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentDocument } from '../../../schemas/content.schema';
import { Model } from 'mongoose';
import { AddPhotoDto } from './dtos/addPhotoDto';
import { Express } from 'express';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<ContentDocument>,
  ) {}

  async addPhoto(plotId, addPhotoDto: AddPhotoDto, img: Express.Multer.File[]) {
    if (img && img.length > 0) {
      addPhotoDto.img = img[0].filename;
    } else {
      addPhotoDto.img = null;
    }
    const updateResult = await this.contentModel.findOneAndUpdate(
      { _id: plotId },
      { $push: { images: addPhotoDto } },
      {
        new: true,
      },
    );
    const plot = await this.contentModel.findOne({ _id: plotId }).exec();
    const plotAll = await this.contentModel.find().exec();
    console.log(plot);
    console.log(plotAll);
    return plot;
  }
}
