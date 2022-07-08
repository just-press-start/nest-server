import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

//TODO: plot will extend Blog, Sketch, Excel...

export type PlotDocument = Plot & mongoose.Document;

@Schema({ _id: false })
export class Plot {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  type: string;
}

export const PlotSchema = SchemaFactory.createForClass(Plot);
