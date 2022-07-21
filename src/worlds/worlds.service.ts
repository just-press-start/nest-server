import { Injectable } from '@nestjs/common';
import { WorldGetDto } from './models/dto/WorldGetDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { World, WorldDocument } from './schemas/world.schema';
import { WorldDto } from './models/dto/WorldDto';
import { generateOceanPlots } from './generators/generators';
import { WorldsGetDto } from './models/dto/WorldsGetDto';

@Injectable()
export class WorldsService {
  constructor(
    @InjectModel(World.name)
    private worldModel: Model<WorldDocument>,
  ) {}

  //TODO: populate "Island" document when worlds created.
  async createWorld(body: WorldDto): Promise<WorldGetDto> {
    const { name, img, sideLength, islandCount } = body;
    const newOcean: World = {
      name,
      img,
      sideLength,
      worldPlots: await generateOceanPlots(sideLength, islandCount),
    };
    const newOceanModel = new this.worldModel(newOcean);
    const insertResult = await newOceanModel.save();
    return this.worldModel.findOne({ _id: insertResult._id }).lean();
  }

  async getWorlds(): Promise<WorldsGetDto> {
    return this.worldModel.find().lean();
  }

  async getWorldById(id: string): Promise<WorldGetDto> {
    return this.worldModel.findOne({ _id: id }).lean();
  }

  async deleteWorld(id: string): Promise<any> {
    return this.worldModel.findByIdAndRemove(id);
  }

  async deleteWorlds(): Promise<any> {
    return this.worldModel.deleteMany();
  }
}
