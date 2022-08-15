import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class WorldPlot {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  img: string;

  @Prop()
  isIsland: boolean;

  @Prop()
  createdAtTimestamp: number;
}

export const WorldPlotSchema = SchemaFactory.createForClass(WorldPlot);
