import { Injectable } from '@nestjs/common';
import { WorldGetDto } from './models/dto/WorldGetDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { World, WorldDocument } from './schemas/world.schema';
import { WorldDto } from './models/dto/WorldDto';
import { generateOceanPlots } from './generators/generators';

@Injectable()
export class WorldService {
  constructor(
    @InjectModel(World.name)
    private worldModel: Model<WorldDocument>,
  ) {}

  //TODO: populate "Island" document when world created.
  async createWorld(body: WorldDto): Promise<WorldGetDto> {
    const newOcean: World = {
      name: body.name,
      img: body.img,
      sideLength: body.sideLength,
      oceanPlots: generateOceanPlots(body.sideLength, body.islandCount),
    };
    const newOceanModel = new this.worldModel(newOcean);
    const insertResult = await newOceanModel.save();
    return this.worldModel.findOne({ _id: insertResult._id }).lean();
  }

  async getWorldById(id: string): Promise<WorldGetDto> {
    return this.worldModel.findOne({ _id: id }).lean();
  }
}
