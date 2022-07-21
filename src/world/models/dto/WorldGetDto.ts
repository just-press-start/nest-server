import mongoose from 'mongoose';
import ObjectId = mongoose.Schema.Types.ObjectId;

export class WorldGetDto {
  _id: ObjectId;
  img: string;
  name: string;
  sideLength: number;
  worldPlots: [];
}
