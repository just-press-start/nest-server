import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

//TODO: contents will extend Blog, Sketch, Excel...

export type ContentDocument = Content & mongoose.Document;

@Schema({ _id: false })
export class Content {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  type: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
