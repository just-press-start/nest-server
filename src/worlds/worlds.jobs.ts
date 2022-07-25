import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { World, WorldDocument } from './schemas/world.schema';
import mongoose, { Model } from 'mongoose';
import { WorldPlot } from './models/WorldPlot';
import IslandGeneratorAPI from './worldsAdapter';
import { FutureIsland } from './models/FutureIsland';
import { Island, IslandDocument } from '../islands/schemas/island.schema';
import { Plot } from '../islandPlots/schemas/islandPlot.schema';
import ObjectId = mongoose.Schema.Types.ObjectId;

@Injectable()
export class WorldsJobs {
  constructor(
    @InjectModel(World.name)
    private worldModel: Model<WorldDocument>,
    @InjectModel(Island.name)
    private islandModel: Model<IslandDocument>,
  ) {}
  private readonly logger = new Logger(WorldsJobs.name);
  queuedFutureIslands = [];

  @Cron('*/30 * * * * *')
  async handleCron() {
    this.logger.debug('Cron job run!');
    const worlds: World[] = await this.worldModel.find().lean();
    for (const world of worlds) {
      const worldId = world._id;
      for (const futureIsland of world.futureIslands) {
        this.processFutureIslands(futureIsland, worldId);
      }
    }
    this.logger.debug(
      `queuedFutureIslands count: ${this.queuedFutureIslands.length}`,
    );
  }

  private processFutureIslands(futureIsland: FutureIsland, worldId: ObjectId) {
    const { islandGenerationTimestamp, coordinate } = futureIsland;
    const islandHash = this.getIslandHash(worldId, coordinate);
    if (!this.queuedFutureIslands.includes(islandHash)) {
      this.addIslandToQueue(
        worldId,
        islandGenerationTimestamp,
        coordinate,
        islandHash,
      );
      this.queuedFutureIslands.push(islandHash);
      this.logger.debug(`${islandHash} added to future islands queue!`);
    }
  }

  addIslandToQueue(worldId, islandGenerationTimestamp, coordinate, islandHash) {
    const remainingMilliseconds: number =
      islandGenerationTimestamp - new Date().getTime() > 0
        ? islandGenerationTimestamp - new Date().getTime()
        : 0;
    this.logger.debug(remainingMilliseconds);
    setTimeout(async () => {
      const islandObject = await this.generateIslandObject();
      await this.updateIslandDocument(worldId, coordinate, islandObject);
      const queueIndex = this.queuedFutureIslands.indexOf(islandHash);
      this.queuedFutureIslands.splice(queueIndex, 1);
    }, remainingMilliseconds);
  }

  getIslandHash(worldId, coordinate): string {
    return `${worldId}_${coordinate}`;
  }

  async generateIslandObject(): Promise<WorldPlot> {
    const islandImg = (await IslandGeneratorAPI.getIslandPictureNames(1))[0];
    return {
      name: 'generated when time has come!',
      isIsland: true,
      img: islandImg,
    };
  }

  async updateIslandDocument(worldId, coordinate, islandObject) {
    const setObj = {};
    setObj[`worldPlots.${coordinate}`] = islandObject;
    const islandId = await this.getIslandId(worldId, coordinate);
    const updateResult = await this.worldModel.updateOne(
      { _id: worldId },
      {
        $set: setObj,
      },
    );
    if (updateResult.acknowledged) {
      const pullFutureIslandsResult = await this.worldModel.updateOne(
        { _id: worldId },
        {
          $pull: { futureIslands: { coordinate: coordinate } },
        },
      );
      if (pullFutureIslandsResult.acknowledged) {
        const insertResult = await this.createIslandDocument(islandId);
        console.log(insertResult);
      }
    }
    this.logger.debug(
      `new island generated to worldId:${worldId} at coordinate:${coordinate}`,
    );
  }

  async getIslandId(worldId, coordinate) {
    const worldObject: World = await this.worldModel
      .findOne({ _id: worldId })
      .lean();
    return worldObject.worldPlots[coordinate]._id;
  }

  async createIslandDocument(islandId) {
    const islandPictureName: string = (
      await IslandGeneratorAPI.getIslandPictureNames(1)
    )[0];

    const islandPlots: Plot[] = await IslandGeneratorAPI.getIslandPlots(
      islandPictureName,
    );
    const islandModel: Island = {
      _id: islandId,
      name: 'temp',
      img: islandPictureName,
      plots: islandPlots,
    };
    const newIslandDocument = new this.islandModel(islandModel);
    const insertResult = await newIslandDocument.save();
    return insertResult;
  }
}
