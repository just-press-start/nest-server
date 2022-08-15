import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { WorldPlot, WorldPlotSchema } from './worldPlot.schema';
import ObjectId = mongoose.Schema.Types.ObjectId;

export type WorldDocument = World & Document;

@Schema()
export class World {
  _id?: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: [WorldPlotSchema], required: true })
  worldPlots: WorldPlot[];

  @Prop({ required: true })
  sideLength: number;
}

export const WorldSchema = SchemaFactory.createForClass(World);
