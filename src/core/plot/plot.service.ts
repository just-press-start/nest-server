import { InitializePlotDto } from './dtos/initializePlotDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plot, PlotDocument } from 'src/schemas/plot.schema';
import { Model } from 'mongoose';
import { PlotsReturnType } from './types';

@Injectable()
export class PlotService {
    constructor(
        @InjectModel(Plot.name)
        private plotModel: Model<PlotDocument>,
    ) { }

    async initializePlot(id, initializePlotDto: InitializePlotDto) {
        initializePlotDto._id = id;
        const newIsland = new this.plotModel(initializePlotDto);
        return newIsland.save();
    }

    async findAll(): Promise<PlotsReturnType> {
        const plots: Plot[] = await this.plotModel.find().exec();
        return { 'plots': plots };
    }

    async deleteAll(): Promise<any> {
        return await this.plotModel.deleteMany();
    }
}
