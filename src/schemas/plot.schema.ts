import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

//TODO: plot will extend Blog, Sketch, Excel...
@Schema()
export class Plot extends Document {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  type: string;
}

export const PlotSchema = SchemaFactory.createForClass(Plot);
