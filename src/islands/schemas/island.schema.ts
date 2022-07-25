import {
  IslandPlotSchema,
  Plot,
} from '../../islandPlots/schemas/islandPlot.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type IslandDocument = Island & Document;

@Schema({ _id: false })
export class Island {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  img: string;

  @Prop({ type: [IslandPlotSchema], required: true })
  plots: Plot[];
}

export const IslandSchema = SchemaFactory.createForClass(Island);
