import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategorySchema, Category } from './category.schema';

@Schema()
export class Topic extends Document {
  @Prop()
  name: string;

  @Prop({ type: [CategorySchema] })
  categories: Category[];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
