import { Content } from './../contents/schemas/content.schema';
import { EditPlotDto } from './models/dtos/editPlotDto';
import { ClaimPlotDto } from './models/dtos/claimPlotDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Island, IslandDocument } from 'src/islands/schemas/island.schema';
import mongoose, { Model } from 'mongoose';
import { Express } from 'express';
import Helper from '../helpers/queryHelper';
import { NotFoundException } from '@nestjs/common';
import { IslandPlotsRepository } from './islandPlots.repository';

@Injectable()
export class IslandPlotsService {
  constructor(
    @InjectModel(Island.name)
    private islandModel: Model<Island>,
    @InjectModel(Content.name)
    private contentModel: Model<Content>,
    private readonly islandPlotsRepository: IslandPlotsRepository,
  ) {}
  async claimPlot(islandId, plotId, claimPlotDto: ClaimPlotDto) {
    const randomColor: string =
      '#' + Math.floor(Math.random() * 16777215).toString(16);
    const islandPlotUpdateObj = { ...claimPlotDto, color: randomColor };
    const claimContentResult = await this.islandPlotsRepository.claimContent(
      plotId,
      claimPlotDto.user,
    );
    const claimIslandPlotResult =
      await this.islandPlotsRepository.claimIslandPlot(
        islandId,
        plotId,
        islandPlotUpdateObj,
      );

    if (claimContentResult) {
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
    if (img && img.length > 0) {
      editPlotDto.img = img[0].filename;
    } else {
      editPlotDto.img = null;
    }
    const setQuery = Helper.generateMongodbSetQuery(
      editPlotDto,
      'plots.$[i]',
      false,
    );
    const updateResult = await this.islandModel.updateOne(
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

    if (updateResult.matchedCount == 1) {
      return await this.islandModel.findOne({ _id: islandId });
    } else {
      throw new NotFoundException();
    }
  }

  async getPlot(islandId, plotId) {
    const aggregateResult = await this.islandModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(islandId),
        },
      },
      {
        $project: {
          name: 1,
          plots: {
            $filter: {
              input: '$plots',
              as: 'plots',
              cond: {
                $eq: ['$$plots._id', new mongoose.Types.ObjectId(plotId)],
              },
            },
          },
        },
      },
      { $project: { plot: { $first: '$plots' } } },
      { $limit: 1 },
    ]);
    const plot = aggregateResult[0].plot;
    return plot;
  }

  async getPlotOld(islandId, plotId) {
    const result = await this.islandModel.find(
      {
        _id: islandId,
        plots: { $elemMatch: { _id: plotId } },
      },
      { 'plots.$': 1, name: 1 },
    );
    return result;
  }
}
