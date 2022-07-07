import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { PlotSchema, Plot } from './plot.schema';

export type IslandDocument = Island & Document;

@Schema()
export class Island {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  img: string;

  @Prop({ type: [PlotSchema], required: true })
  plots: Plot[];

  @Prop({ required: true })
  @ApiProperty()
  islandSize: number;
}

export const IslandSchema = SchemaFactory.createForClass(Island);
