import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AchievementSchema, Achievement } from './achievement.schema';

export class Activity {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: AchievementSchema })
  achievement: Achievement;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
