import ObjectId = mongoose.Schema.Types.ObjectId;
import mongoose from 'mongoose';
import { IslandPlot } from '../IslandPlot';

export class IslandGetDto {
  _id: ObjectId;
  img: string;
  name: string;
  sideLength: number;
  islandPlots: IslandPlot[];
}
