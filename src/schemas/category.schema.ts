import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Activity, ActivitySchema } from './activity.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: [ActivitySchema] })
  activities: Activity[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
