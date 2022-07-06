import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//TODO: plot will extend Blog, Sketch, Excel...
@Schema()
export class Plot extends Document {
  @Prop()
  name: string;

  @Prop()
  type: string;
}

export const PlotSchema = SchemaFactory.createForClass(Plot);
