import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Plot extends Document {
  @Prop()
  i: number;

  @Prop()
  j: number;

  @Prop()
  isClaimable: boolean;

  @Prop()
  user?: string;

  @Prop()
  color?: string;

  @Prop()
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  img: string;
}

export const IslandPlotSchema = SchemaFactory.createForClass(Plot);
