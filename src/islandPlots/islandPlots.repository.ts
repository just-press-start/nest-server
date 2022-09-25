import { ClaimPlotDto } from './models/dtos/claimPlotDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from 'src/contents/schemas/content.schema';
import Helper from 'src/helpers/queryHelper';
import { Island } from 'src/islands/schemas/island.schema';

@Injectable()
export class IslandPlotsRepository {
  constructor(
    @InjectModel(Island.name)
    private islandModel: Model<Island>,
    @InjectModel(Content.name)
    private contentModel: Model<Content>,
  ) {}

  async claimIslandPlot(islandId, plotId, claimPlotDto) {
    const setQuery = Helper.generateMongodbSetQuery(
      claimPlotDto,
      'plots.$[i]',
      false,
    );

    return await this.islandModel.updateOne(
      { _id: islandId },
      {
        $set: setQuery,
      },
      {
        arrayFilters: [
          {
            'i._id': plotId,
          },
        ],
      },
    );
  }

  async claimContent(plotId, user) {
    const newContent = new this.contentModel({ _id: plotId, user: user });
    await newContent.save();
    return await this.contentModel.findOne({ _id: plotId }).lean();
  }
}
