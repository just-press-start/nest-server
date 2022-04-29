import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AchievementSchema, Achievement } from './achievement.schema';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: AchievementSchema })
  achievement: Achievement;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
