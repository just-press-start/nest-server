import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WorldPlot, WorldPlotSchema } from './worldPlot.schema';

export type WorldDocument = World & Document;

@Schema()
export class World {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: [WorldPlotSchema], required: true })
  oceanPlots: WorldPlot[];

  @Prop({ required: true })
  sideLength: number;
}

export const WorldSchema = SchemaFactory.createForClass(World);
