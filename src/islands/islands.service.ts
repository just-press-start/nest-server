import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Island, IslandDocument } from 'src/islands/schemas/island.schema';
import { Model } from 'mongoose';
import { Plot } from 'src/islandPlots/schemas/islandPlot.schema';
import { IslandGetDto } from './models/dto/IslandGetDto';
import { IslandDto } from './models/dto/IslandDto';
import { IslandsGetDto } from './models/dto/IslandsGetDto';

@Injectable()
export class IslandsService {
  constructor(
    @InjectModel(Island.name)
    private islandModel: Model<IslandDocument>,
  ) {}

  async create(body: IslandDto): Promise<IslandGetDto> {
    body.plots = [] as Plot[];
    for (let i = 0; i < Math.pow(body.sideLength, 2); i++) {
      const plot = new Plot();
      body.plots.push(plot);
    }
    const newIsland = new this.islandModel(body);
    const insertResult = await newIsland.save();
    return this.islandModel.findOne({ _id: insertResult._id }).lean();
  }

  async findAll(): Promise<any> {
    const result = await this.islandModel.find().lean();
    return result;
  }

  async findById(id): Promise<IslandGetDto> {
    return this.islandModel.findOne({ _id: id }).lean();
  }

  async update(id, updatedIsland: Island): Promise<IslandGetDto> {
    await this.islandModel.updateOne({ _id: id }, updatedIsland);
    return this.islandModel.findOne({ _id: id }).lean();
  }

  async delete(id): Promise<any> {
    return this.islandModel.findByIdAndRemove(id);
  }

  async deleteAll(): Promise<any> {
    return this.islandModel.deleteMany();
  }
}
