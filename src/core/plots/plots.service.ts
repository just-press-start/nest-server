import { EditPlotDto } from './dtos/editPlotDto';
import { ClaimPlotDto } from './dtos/claimPlotDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Island } from 'src/schemas/island.schema';
import { Model } from 'mongoose';


@Injectable()
export class PlotsService {
    constructor(
        @InjectModel(Island.name)
        private islandModel: Model<Island>,
    ) { }

    async claimPlot(islandId, plotId, claimPlotDto: ClaimPlotDto) {
        const updateResult = await this.islandModel.updateOne(
            { _id: islandId },
            { $set: { 'plots.$[i].user_name': claimPlotDto.user_name } },
            {
                arrayFilters: [
                    {
                        'i._id': plotId,
                    },
                ],
            },
        );

        if (updateResult.matchedCount == 1) {
            return await this.islandModel.findOne({ _id: islandId })
        } else {
            return null;
        }
    }

    async editPlot(islandId, plotId, editPlotDto: EditPlotDto) {
        const updateResult = await this.islandModel.updateOne(
            { _id: islandId },
            {
                $set: {
                    'plots.$[i].color': editPlotDto.color,
                    'plots.$[i].name': editPlotDto.name
                }
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
            return await this.islandModel.findOne({ _id: islandId })
        } else {
            return null;
        }
    }


}
