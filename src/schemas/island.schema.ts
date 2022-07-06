import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlotSchema, Plot } from './plot.schema';

@Schema()
export class Island extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: [PlotSchema], required: true })
  categories: Plot[];
}

export const IslandSchema = SchemaFactory.createForClass(Island);
