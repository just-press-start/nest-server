import { Injectable } from '@nestjs/common';
import { WorldGetDto } from './models/dto/WorldGetDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { World, WorldDocument } from './schemas/world.schema';
import { WorldDto } from './models/dto/WorldDto';
import {
  generateFutureIslands,
  generateOceanPlots,
} from './generators/generators';
import { WorldsGetDto } from './models/dto/WorldsGetDto';
import { Express } from 'express';
import WorldsAdapter from './worldsAdapter';
import IslandGeneratorAPI from './worldsAdapter';
import { Plot } from '../islandPlots/schemas/islandPlot.schema';
import { Island, IslandDocument } from '../islands/schemas/island.schema';

@Injectable()
export class WorldsService {
  constructor(
    @InjectModel(World.name)
    private worldModel: Model<WorldDocument>,
    @InjectModel(Island.name)
    private islandModel: Model<IslandDocument>,
  ) {}

  //TODO: populate "Island" document when worlds created.
  async createWorld(
    body: WorldDto,
    images: Express.Multer.File[],
  ): Promise<WorldGetDto> {
    body.img = this.getImage(images);
    const { name, img, sideLength, islandCount } = body;
    const { futureIslandCount, initialIslandCount } =
      this.getIslandCounts(islandCount);
    const { generatedOceanPlots, reservedIndexes } = await generateOceanPlots(
      sideLength,
      initialIslandCount,
    );
    const futureIslands = generateFutureIslands(
      sideLength,
      futureIslandCount,
      reservedIndexes,
    );
    const newOcean: World = {
      name,
      img,
      sideLength,
      futureIslands,
      worldPlots: generatedOceanPlots,
    };
    const newOceanModel = new this.worldModel(newOcean);
    const insertResult = await newOceanModel.save();
    for (const worldPlot of newOceanModel.worldPlots) {
      if (worldPlot.isIsland) {
        await this.createIslandDocument(worldPlot._id, worldPlot.img);
      }
    }
    return this.worldModel.findOne({ _id: insertResult._id }).lean();
  }

  async getWorlds(): Promise<WorldsGetDto> {
    return this.worldModel.find().lean();
  }

  async getWorldById(id: string): Promise<WorldGetDto> {
    return this.worldModel.findOne({ _id: id }).lean();
  }

  async deleteWorld(id: string): Promise<any> {
    const islandImages = await this.getIslandImages(id);
    await WorldsAdapter.deleteIslandPictures(islandImages);
    return this.worldModel.findByIdAndRemove(id);
  }

  private async getIslandImages(id: string) {
    const islandImages = [];
    const world: World = await this.worldModel.findOne({ _id: id }).lean();
    for (const island of world.worldPlots) {
      islandImages.push(island.img);
    }
    return islandImages;
  }

  async deleteWorlds(): Promise<any> {
    await WorldsAdapter.deleteAllIslandPictures();
    return this.worldModel.deleteMany();
  }

  getImage(images: Express.Multer.File[]): string {
    if (images && images.length > 0) {
      return images[0].filename;
    } else {
      return null;
    }
  }

  getIslandCounts(islandCount) {
    return {
      futureIslandCount:
        islandCount - Number(process.env.GENERATED_ISLAND_COUNT_ON_CREATION),
      initialIslandCount: Number(
        process.env.GENERATED_ISLAND_COUNT_ON_CREATION,
      ),
    };
  }

  async createIslandDocument(islandId, pictureName) {
    const islandPlots: Plot[] = await IslandGeneratorAPI.getIslandPlots(
      pictureName,
    );
    const islandModel: Island = {
      _id: islandId,
      name: 'temp',
      img: pictureName,
      plots: islandPlots,
    };
    const newIslandDocument = new this.islandModel(islandModel);
    const insertResult = await newIslandDocument.save();
    return insertResult;
  }
}
