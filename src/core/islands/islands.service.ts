import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Island, IslandDocument } from 'src/schemas/island.schema';
import { IslandReturnType, IslandsReturnType } from './types';
import { Model } from 'mongoose';
import { Plot } from 'src/schemas/plot.schema';

@Injectable()
export class IslandsService {
  constructor(
    @InjectModel(Island.name)
    private islandModel: Model<IslandDocument>,
  ) {}

  async create(islandDto: Island): Promise<Island> {
    islandDto.plots = [] as Plot[];
    for (let i = 0; i < Math.pow(islandDto.islandSize, 2); i++) {
      const plot = new Plot();
      islandDto.plots.push(plot);
    }
    const newIsland = new this.islandModel(islandDto);
    return newIsland.save();
  }

  async findAll(): Promise<IslandsReturnType> {
    const islands: Island[] = await this.islandModel.find().exec();
    return { islands: islands };
  }

  async findById(id): Promise<IslandReturnType> {
    const island: Island = await this.islandModel.findOne({ _id: id }).exec();
    return { island: island };
  }

  async update(id, updatedIsland: Island): Promise<Island> {
    await this.islandModel.updateOne({ _id: id }, updatedIsland);
    return await this.islandModel.findOne({ _id: id });
  }

  async delete(id): Promise<Island> {
    return await this.islandModel.findByIdAndRemove(id);
  }

  async deleteAll(): Promise<any> {
    return await this.islandModel.deleteMany();
  }
}
