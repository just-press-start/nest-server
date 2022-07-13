import { EditPlotDto } from './dtos/editPlotDto';
import { ClaimPlotDto } from './dtos/claimPlotDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Island } from 'src/schemas/island.schema';
import { Model } from 'mongoose';
import { Express } from 'express';

@Injectable()
export class PlotsService {
  constructor(
    @InjectModel(Island.name)
    private islandModel: Model<Island>,
  ) {}

  async claimPlot(islandId, plotId, claimPlotDto: ClaimPlotDto) {
    const randomColor: string =
      '#' + Math.floor(Math.random() * 16777215).toString(16);
    const updateResult = await this.islandModel.updateOne(
      { _id: islandId },
      {
        $set: {
          'plots.$[i].user_name': claimPlotDto.user_name,
          'plots.$[i].color': randomColor,
        },
      },
      {
        arrayFilters: [
          {
            'i._id': plotId,
          },
        ],
      },
    );

    if (updateResult.matchedCount == 1) {
      return await this.islandModel.findOne({ _id: islandId });
    } else {
      return null;
    }
  }

  async editPlot(
    islandId,
    plotId,
    editPlotDto: EditPlotDto,
    img: Express.Multer.File[],
  ) {
    const updateResult = await this.islandModel.updateOne(
      { _id: islandId },
      {
        $set: {
          'plots.$[i].color': editPlotDto.color,
          'plots.$[i].name': editPlotDto.name,
          'plots.$[i].img': img[0].filename,
        },
      },
      {
        arrayFilters: [
          {
            'i._id': plotId,
          },
        ],
      },
    );

    if (updateResult.matchedCount == 1) {
      return await this.islandModel.findOne({ _id: islandId });
    } else {
      return null;
    }
  }
}
