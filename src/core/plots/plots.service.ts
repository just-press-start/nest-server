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
        await this.islandModel.updateOne(
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
        return await this.islandModel.findOne({ _id: islandId });
    }


}
