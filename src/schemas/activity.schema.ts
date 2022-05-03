import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AchievementSchema, Achievement } from './achievement.schema';

@Schema()
export class Activity extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: AchievementSchema })
  achievement: Achievement;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
