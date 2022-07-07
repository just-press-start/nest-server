import { Plot } from 'src/schemas/plot.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Island } from 'src/schemas/island.schema';
import { Model } from 'mongoose';
import { IslandPlot } from 'src/schemas/islandPlot.schema';

@Injectable()
export class PlotsService {
    constructor(
        @InjectModel(Island.name)
        private islandModel: Model<Island>,
    ) { }

    async claimPlot(islandId, plotId, islandPlotDto: IslandPlot) {
        await this.islandModel.updateOne(
            { _id: islandId },
            { $set: { 'plots.$[i]': islandPlotDto } },
            {
                arrayFilters: [
                    {
                        'i._id': plotId,
                    },
                ],
            },
        );
        return await this.islandModel.findOne({ _id: islandId });


    }

}
