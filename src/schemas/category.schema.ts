import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity.schema';
import { Document } from 'mongoose';

@Schema({ _id: true })
export class Category extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: [ActivitySchema] })
  activities: Activity[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
