import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { PlotSchema, Plot } from './plot.schema';

@Schema()
export class Island extends Document {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  img: string;

  @Prop({ type: [PlotSchema], required: true })
  @ApiProperty({
    isArray: true,
    type: Plot
  })
  plots: Plot[];
}

export const IslandSchema = SchemaFactory.createForClass(Island);
